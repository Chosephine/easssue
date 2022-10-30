package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.kwd.KwdDto;
import com.limemul.easssue.api.dto.kwd.KwdListDto;
import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
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
    @GetMapping("/user")
    public KwdListDto getUserKwd(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /keyword/user");
        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        //로그인 안하면 랜덤으로 하나
        if(optionalUser.isEmpty()){
            log.info("User not signed in");
            log.info("[Finished request] GET /keyword/user");
            return new KwdListDto(getRandomKwd());
        }

        User user = optionalUser.get();
        List<UserKwd> userKwdList = userKwdService.getUserKwdList(user);
        log.info("userId: {}, userKwdList size: {}",user.getId(),userKwdList.size());

        //로그인 했는데 없으면 랜덤으로 하나
        if(userKwdList.isEmpty()){
            log.info("User doesn't have keywords");
            log.info("[Finished request] GET /keyword/user");
            return new KwdListDto(getRandomKwd());
        }

        //구독 키워드 리스트 반환
        log.info("[Finished request] GET /keyword/user");
        return new KwdListDto(userKwdList.stream().map(KwdDto::new).toList());
    }

    /**
     * 추천 키워드 조회
     *  [로그인 o] 해당 사용자의 추천 키워드 리스트 반환 (하루 이내 등록, 점수 내림차순)
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
        List<RecKwd> recKwdList = recKwdService.getRecKwdList(user);
        log.info("userId: {}, recKwdList size: {}",user.getId(),recKwdList.size());

        //추천 키워드 리스트 반환
        log.info("[Finished request] GET /keyword/recommend");
        return new KwdListDto(recKwdList.stream().map(KwdDto::new).toList());
    }

    /**
     * 구독 키워드 수정
     */
    @PutMapping("/user")
    public boolean updateUserKwd(@RequestHeader HttpHeaders headers, @RequestBody KwdListDto kwdListDto){
        log.info("[Starting request] PUT /keyword/user");
        //사용자 정보 불러오기
        Optional<User> optionalUser = getUserFromJwt(userService, headers);

        List<Long> kwdIds = kwdListDto.getKwdList().stream().map(KwdDto::getKwdId).toList();

    }

    /**
     * 랜덤 키워드 한개 조회
     */
    private List<KwdDto> getRandomKwd() {
        return kwdService.getRandomKwd().stream().map(KwdDto::new).toList();
    }

    /**
     * 테스트용 사용자
     * todo 로그인 기능 해결 후 지우기
     */
    private User getUser1() {
        return userService.getUserByEmail("user1@xx.xx");
    }
}
