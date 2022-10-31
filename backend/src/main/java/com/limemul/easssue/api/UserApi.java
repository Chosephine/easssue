package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.user.JwtResDto;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import static com.limemul.easssue.jwt.JwtProperties.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserApi {

    private final UserService userService;
//    private final RedisService redisService;

    @PostMapping("/login")
    public JwtResDto googleLogin(HttpServletRequest request){
        //로그인 요청한 사용자의 이메일
        String email=userService.getEmail(request);

        //access token, refresh token 발급
        String accessToken=TOKEN_PREFIX+JwtProvider.createToken(email,ACCESS_EXPIRATION_TIME);
        String refreshToken=TOKEN_PREFIX+JwtProvider.createToken(email,REFRESH_EXPIRATION_TIME);
        //todo refresh token redis에 넣기
//        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(REFRESH_EXPIRATION_TIME));

        return new JwtResDto(accessToken,refreshToken);
    }

}
