package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.kwd.KwdDto;
import com.limemul.easssue.api.dto.kwd.KwdListDto;
import com.limemul.easssue.api.dto.kwd.KwdUpdateDto;
import com.limemul.easssue.entity.*;
import com.limemul.easssue.service.KwdService;
import com.limemul.easssue.service.RecKwdService;
import com.limemul.easssue.service.UserKwdService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
        List<UserKwd> subscKwdList = userKwdService.getUserKwdList(user,UserKwdType.s);
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
     * 금지 키워드 조회
     */
    @GetMapping("/ban")
    public KwdListDto getBanKwd(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /keyword/ban");

        // 사용자 정보 불러오기
        User user = getUser(headers);
        List<UserKwd> banKwdList = userKwdService.getUserKwdList(user,UserKwdType.b);
        log.info("userId: {}, banKwdList size: {}",user.getId(),banKwdList.size());

        log.info("[Finished request] GET /keyword/ban");
        return new KwdListDto(banKwdList.stream().map(KwdDto::new).toList());
    }

    /**
     * 추천 키워드 조회
     *  [로그인 o] 해당 사용자의 추천 키워드 리스트 반환 (하루 이내 등록, 점수 내림차순, 금지 키워드 제외)
     *  (로그인 했을때만 호출)
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
        List<Kwd> recKwdList = new ArrayList<>(recKwdService
                .getRecKwdList(user).stream().map(RecKwd::getKwd).toList());
        log.info("userId: {}, recKwdList size: {}",user.getId(),recKwdList.size());

        //해당 사용자의 금지 키워드 리스트
        List<Kwd> banKwdList = new ArrayList<>(userKwdService
                .getUserKwdList(user,UserKwdType.b).stream().map(UserKwd::getKwd).toList());
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
     * 사용자 키워드 수정
     *  [로그인 o] 인자로 받은 키워드 리스트로 해당 사용자의 키워드 변경
     *  (로그인 했을때만 호출)
     */
    @PutMapping
    public boolean updateUserKwd(@RequestHeader HttpHeaders headers,@RequestBody KwdUpdateDto kwdUpdateDto){
        log.info("[Starting request] PUT /keyword");

        User user = getUser(headers);

        updateKwdList(user, kwdUpdateDto.getSubscKwdList(), UserKwdType.s);
        updateKwdList(user, kwdUpdateDto.getBanKwdList(), UserKwdType.b);

        log.info("[Finished request] PUT /keyword");
        return true;
    }

    /**
     * 구독 키워드 수정
     *  [로그인 o] 인자로 받은 키워드 리스트로 해당 사용자의 구독 키워드 변경
     *  (로그인 했을때만 호출)
     */
    @PutMapping("/subscribe")
    public boolean updateSubscKwd(@RequestHeader HttpHeaders headers, @RequestBody KwdListDto kwdListDto){
        log.info("[Starting request] PUT /keyword/subscribe");

        //사용자 정보 불러오기
        User user = getUser(headers);

        if(kwdListDto.getKwdList().size()>15){
            throw new IllegalArgumentException("구독 키워드는 15개를 초과할 수 없습니다.");
        }

        updateKwdList(user, kwdListDto.getKwdList(), UserKwdType.s);

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

        //사용자 정보 불러오기
        User user = getUser(headers);

        log.info("ban kwdListDto.getKwdList(): {}",kwdListDto.getKwdList());
        updateKwdList(user, kwdListDto.getKwdList(), UserKwdType.b);

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
     * 헤더에서 사용자 정보 불러오기
     */
    private User getUser(HttpHeaders headers) {
        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        //로그인 안하면 예외 발생
        if(optionalUser.isEmpty()){
            throw new NoSuchElementException("로그인 후 사용할 수 있는 기능입니다.");
        }

        return optionalUser.get();
    }

    /**
     * 사용자 키워드 수정
     *  UserKwdType에 따라 구독 또는 금지 키워드 변경
     */
    private void updateKwdList(User user, List<KwdDto> kwdListDto, UserKwdType type) {
        List<Long> kwdIds = kwdListDto.stream().map(KwdDto::getKwdId).toList();
        log.info("kwdIds: {}",kwdIds);

        //받아온 키워드 리스트로 업데이트
        userKwdService.updateUserKwdList(user,kwdIds,type);
    }
}
