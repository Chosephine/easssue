package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.user.JwtResDto;
import com.limemul.easssue.api.dto.user.LoginReqDto;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

import java.net.URI;
import java.net.URISyntaxException;

import static com.limemul.easssue.jwt.JwtProperties.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserApi {

    private final UserService userService;
//    private final RedisService redisService;

    @Value("${google.clientId}")
    private final String clientId;
    @Value("${google.clientSecret}")
    private final String clientSecret;

    /**
     *
     */
    @PostMapping("/login")
    public void googleLogin(@RequestBody LoginReqDto loginReqDto) throws URISyntaxException {
//    public JwtResDto googleLogin(@RequestBody LoginReqDto loginReqDto) throws URISyntaxException {
        log.info("[Starting request] POST /user/login");

        //google access token
        String googleToken=loginReqDto.getGoogleToken();

        //구글에 사용자 프로필 요청
        RestTemplate restTemplate=new RestTemplate();

        String url="https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+googleToken;
//        String url="https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+googleToken;
        ResponseEntity<?> resultMap = restTemplate.getForEntity(new URI(url), Object.class);

        System.out.println(resultMap.toString());
        //todo 로그인 요청한 사용자의 이메일


//        //access token, refresh token 발급
//        String accessToken=TOKEN_PREFIX+JwtProvider.createToken(email,ACCESS_EXPIRATION_TIME);
//        String refreshToken=TOKEN_PREFIX+JwtProvider.createToken(email,REFRESH_EXPIRATION_TIME);
//        //todo refresh token redis에 넣기
////        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(REFRESH_EXPIRATION_TIME));
//
//        return new JwtResDto(accessToken,refreshToken);
    }

}
