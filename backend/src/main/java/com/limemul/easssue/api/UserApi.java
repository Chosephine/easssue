package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.user.JwtResDto;
import com.limemul.easssue.api.dto.user.UserInfoDto;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static com.limemul.easssue.jwt.JwtProperties.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserApi {

    private final UserService userService;
//    private final RedisService redisService;


    /**
     * 로그인
     *  프론트에서 받은 email, pwd
     *  유저 확인, pwd 일치 여부 학인 후 올바른 요청일 경우
     *  프론트에 프론트-백 access token, refresh token 반환
     */
    @PostMapping("/login")
    public JwtResDto googleLogin(@RequestBody UserInfoDto userInfoDto) {
        log.info("[Starting request] POST /user/login");
        String email=userInfoDto.getEmail();
        log.info("Request user: {}", email);
        if (userService.checkUser(userInfoDto)) {
            //access token, refresh token 발급
            String accessToken=TOKEN_PREFIX+JwtProvider.createToken(email,ACCESS_EXPIRATION_TIME);
            String refreshToken=TOKEN_PREFIX+JwtProvider.createToken(email,REFRESH_EXPIRATION_TIME);

            //todo refresh token redis에 넣기
//        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(REFRESH_EXPIRATION_TIME));

            log.info("user {} is logged in", email);
            log.info("[Finished request] POST /user/login");
            return new JwtResDto(true, accessToken,refreshToken);
        } else {
            log.info("login is failed");
            log.info("[Finished request] POST /user/login");
            return new JwtResDto(false, "","");
        }

    }

    /**
     * 회원가입
     * email, pwd 받아서 db 저장
     * pwd 는 암호화
     */
    @PostMapping("/signup")
    public boolean signUp(@RequestBody UserInfoDto userInfoDto){
        log.info("[Starting request] POST /user/signup");

        log.info("New user: {}", userInfoDto.getEmail());

        User signUpUser = userService.signUp(userInfoDto);
        log.info("New user {} is signed up.", signUpUser.getId());

        log.info("[Finished request] POST /user/signup");
        return true;
    }

    /**
     * 이메일 중복 체크 api
     */
    @GetMapping("/check/{email}")
    public boolean emailCheck(@PathVariable String email) {
        log.info("[Starting request] GET /user/check/{}", email);

        log.info("request email: {}", email);

        User findUser = userService.emailCheck(email);
        log.info("findUser: {}", findUser);

        log.info("[Finished request] GET /user/check/{}", email);
        return findUser == null;
    }

    /**
     * jwt 존재 및 만료 여부 확인
     */
    @GetMapping("/jwt")
    public boolean isSignedIn(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /user/test");

        try {
            Optional<User> optionalUser = JwtProvider.getUserFromJwt(userService, headers);
            if(optionalUser.isEmpty()){
                //토큰 없으면 false 반환
                log.info("no jwt");
                log.info("[Finished request] GET /user/test");
                return false;
            }else{
                //토큰 있고 만료 안됐으면 true 반환
                log.info("jwt ok");
                log.info("[Finished request] GET /user/test");
                return true;
            }
        }catch (ExpiredJwtException e){
            //토큰 있지만 만료 됐으면 false 반환
            log.info("expired jwt");
            log.info("[Finished request] GET /user/test");
            return false;
        }
    }
}
