package com.limemul.easssue.jwt;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.limemul.easssue.jwt.JwtProperties.*;

public class JwtProvider {

    /**
     * access token, refresh token 생성
     *  email을 토큰에 저장
     *  토큰 종류에 따라 유효기간 지정
     */
    public static String createToken(String email, long tokenInvalidTime) {
        Date now = new Date();

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenInvalidTime))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public static String getEmail(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * jwt에서 email로 사용자 찾아서 반환
     *  토큰 없으면 Optional.empty() 반환
     */
    public static Optional<User> getUserFromJwt(UserService userService, HttpHeaders headers){
        List<String> auth = headers.get(HEADER_STRING);
        if(auth==null){
            return Optional.empty();
        }
        String token = auth.get(0).replace(TOKEN_PREFIX, "");
        String email = JwtProvider.getEmail(token);
        return Optional.of(userService.getUserByEmail(email));
    }
}
