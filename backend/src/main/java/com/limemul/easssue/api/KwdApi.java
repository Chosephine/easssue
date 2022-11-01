package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.kwd.KwdDto;
import com.limemul.easssue.api.dto.kwd.KwdListDto;
import com.limemul.easssue.entity.*;
import com.limemul.easssue.service.KwdService;
import com.limemul.easssue.service.RecKwdService;
import com.limemul.easssue.service.UserKwdService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.limemul.easssue.jwt.JwtProvider.getUserFromJwt;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
@Slf4j
public class KwdApi {

    private final KwdService kwdService;
    private final UserService userService;
    private final UserKwdService userKwdService;
    private final RecKwdService recKwdService;

    /**
     * 구독 키워드 조회
     *  [로그인 o] 해당 사용자의 구독 키워드 리스트 반환 (없으면 랜덤으로 하나)
     *  [로그인 x] 랜덤으로 하나
     */
    @GetMapping("/subscribe")
    public KwdListDto getSubscKwd(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /keyword/subscribe");

        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        //로그인 안하면 랜덤으로 하나
        if(optionalUser.isEmpty()){
            log.info("User not signed in");
            log.info("[Finished request] GET /keyword/subscribe");
            return new KwdListDto(getRandomKwd());
        }

        User user = optionalUser.get();
        List<UserKwd> subscKwdList = userKwdService.getSubscKwdList(user);
        log.info("userId: {}, subscKwdList size: {}",user.getId(),subscKwdList.size());

        //로그인 했는데 없으면 랜덤으로 하나
        if(subscKwdList.isEmpty()){
            log.info("User doesn't have keywords");
            log.info("[Finished request] GET /keyword/subscribe");
            return new KwdListDto(getRandomKwd());
        }

        //구독 키워드 리스트 반환
        log.info("[Finished request] GET /keyword/subscribe");
        return new KwdListDto(subscKwdList.stream().map(KwdDto::new).toList());
    }

    /**
     * 추천 키워드 조회
     *  [로그인 o] 해당 사용자의 추천 키워드 리스트 반환 (하루 이내 등록, 점수 내림차순, 금지 키워드 제외)
     *  (로그인 했을때만 호출)
     *  todo 금지 키워드 제대로 지워지는지 체크
     */
    @GetMapping("/recommend")
    public KwdListDto getRecKwd(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /keyword/recommend");

        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        //로그인 안하면 빈 리스트 반환
        if(optionalUser.isEmpty()){
            log.info("User not signed in");
            log.info("[Finished request] GET /keyword/recommend");
            return new KwdListDto();
        }

        User user = optionalUser.get();
        //해당 사용자의 추천 키워드 리스트
        List<RecKwd> recKwdList = recKwdService.getRecKwdList(user);
        log.info("userId: {}, recKwdList size: {}",user.getId(),recKwdList.size());

        //해당 사용자의 금지 키워드 리스트
        List<UserKwd> banKwdList = userKwdService.getBanKwdList(user);
        //추천 키워드에서 금지 키워드 제거
        boolean isRemoved = recKwdList.removeAll(banKwdList);
        if(isRemoved){
            log.info("Some recKwds removed. recKwdList size: {}",recKwdList.size());
        }

        //추천 키워드 리스트 반환
        log.info("[Finished request] GET /keyword/recommend");
        return new KwdListDto(recKwdList.stream().map(KwdDto::new).toList());
    }

    /**
     * 구독 키워드 수정
     *  [로그인 o] 인자로 받은 키워드 리스트로 해당 사용자의 구독 키워드 변경
     *  (로그인 했을때만 호출)
     */
    @PutMapping("/subscribe")
    public boolean updateSubscKwd(@RequestHeader HttpHeaders headers, @RequestBody KwdListDto kwdListDto){
        log.info("[Starting request] PUT /keyword/subscribe");

        updateKwdList(headers, kwdListDto, UserKwdType.s);

        log.info("[Finished request] PUT /keyword/subscribe");
        return true;
    }

    /**
     * 금지 키워드 수정
     *  [로그인 o] 인자로 받은 키워드 리스트로 해당 사용자의 구독 키워드 변경
     *  (로그인 했을때만 호출)
     */
    @PutMapping("/ban")
    public boolean updateBanKwd(@RequestHeader HttpHeaders headers,@RequestBody KwdListDto kwdListDto){
        log.info("[Starting request] PUT /keyword/ban");

        updateKwdList(headers, kwdListDto, UserKwdType.b);

        log.info("[Finished request] PUT /keyword/ban");
        return true;
    }

    /**
     * 검색 키워드 조회
     *  검색한 문자열 포함하는 키워드 리스트 반환
     */
    @GetMapping("/search/{searchStr}")
    public KwdListDto searchKwd(@PathVariable String searchStr){
        log.info("[Starting request] GET /keyword/search/{}",searchStr);

        List<Kwd> kwdList = kwdService.searchKwd(searchStr);
        log.info("kwdList size: {}",kwdList.size());

        log.info("[Finished request] GET /keyword/search/{}",searchStr);
        return new KwdListDto(kwdList.stream().map(KwdDto::new).toList());
    }

    //========================================================================

    /**
     * 랜덤 키워드 한개 조회
     */
    private List<KwdDto> getRandomKwd() {
        return kwdService.getRandomKwd().stream().map(KwdDto::new).toList();
    }

    /**
     * 사용자 키워드 수정
     *  UserKwdType에 따라 구독 또는 금지 키워드 변경
     */
    private void updateKwdList(HttpHeaders headers, KwdListDto kwdListDto, UserKwdType type) {
        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        //로그인 안하면 예외 발생
        //todo 예외 던질지 false 반환할지 프론트와 이야기
        if(optionalUser.isEmpty()){
            throw new IllegalArgumentException("로그인 후 사용할 수 있는 기능입니다.");
        }

        User user = optionalUser.get();
        List<Long> kwdIds = kwdListDto.getKwdList().stream().map(KwdDto::getKwdId).toList();
        //받아온 키워드 리스트로 업데이트
        userKwdService.updateKwdList(user,kwdIds,type);
    }

    /**
     * 테스트용 사용자
     */
    private User getUser(Long userId) {
        return userService.getUserByEmail("user"+userId+"@xx.xx");
    }
}
