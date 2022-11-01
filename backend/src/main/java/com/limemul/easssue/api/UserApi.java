package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.user.JwtResDto;
import com.limemul.easssue.api.dto.user.LoginReqDto;
import com.limemul.easssue.api.dto.user.UserInfoDto;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

import static com.limemul.easssue.jwt.JwtProperties.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserApi {

    private final UserService userService;
//    private final RedisService redisService;

    private static final String googleUserInfoUri ="https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=";

    /**
     * 로그인
     *  프론트에서 보내준 google access token으로 사용자 프로필 요청
     *  비회원이면 강제 회원가입
     *  프론트에 프론트-백 access token, refresh token 반환
     */
    @PostMapping("/login")
    public JwtResDto googleLogin(@RequestBody LoginReqDto loginReqDto) {
        log.info("[Starting request] POST /user/login");

        //google access token
        String googleToken=loginReqDto.getGoogleToken();

        //구글에 사용자 프로필 요청
        RestTemplate restTemplate=new RestTemplate();
        String url= googleUserInfoUri + googleToken;
        ResponseEntity<UserInfoDto> response = restTemplate.getForEntity(url, UserInfoDto.class);

        //로그인 요청한 사용자의 이메일 (비회원이면 강제 회원가입)
        String email=userService.getEmail(Objects.requireNonNull(response.getBody()));

        //access token, refresh token 발급
        String accessToken=TOKEN_PREFIX+JwtProvider.createToken(email,ACCESS_EXPIRATION_TIME);
        String refreshToken=TOKEN_PREFIX+JwtProvider.createToken(email,REFRESH_EXPIRATION_TIME);
        //todo refresh token redis에 넣기
//        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(REFRESH_EXPIRATION_TIME));

        log.info("[Finished request] POST /user/login");
        return new JwtResDto(accessToken,refreshToken);
    }

}
