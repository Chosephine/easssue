package com.limemul.easssue.jwt;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;

import java.util.Date;
import java.util.Objects;

public class JwtProvider {

    public static String createToken(String email, long tokenInvalidTime) {
        Date now = new Date();

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenInvalidTime))
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();
    }

    public static String getEmail(String token) {
        return Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public static User getUserFromJwt(UserService userService, HttpHeaders headers){
        String token = Objects.requireNonNull(headers.get(JwtProperties.HEADER_STRING)).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtProvider.getEmail(token);
        return userService.getUserByEmail(email);
    }
}
