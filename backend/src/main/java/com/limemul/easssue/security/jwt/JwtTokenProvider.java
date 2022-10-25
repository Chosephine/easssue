package com.limemul.easssue.security.jwt;

import com.limemul.easssue.entity.Role;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.security.auth.PrincipalDetails;
import com.limemul.easssue.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpHeaders;

import java.util.Date;
import java.util.Objects;

public class JwtTokenProvider {

    public static String createToken(PrincipalDetails principalDetails, long tokenInvalidTime) {
        Claims claims = Jwts.claims().setSubject(principalDetails.getUsername());
        claims.put("role", principalDetails.getRole().name());
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenInvalidTime))
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();
    }

    public static String createToken(String email, Role role, long tokenInvalidTime) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role.name());
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenInvalidTime))
                .signWith(SignatureAlgorithm.HS256, JwtProperties.SECRET)
                .compact();
    }

    public static String getEmail(String token) {
        return Jwts.parser().setSigningKey(JwtProperties.SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public static User getUserFromJwtToken(UserService userService, HttpHeaders headers){
        String token = Objects.requireNonNull(headers.get(JwtProperties.HEADER_STRING)).get(0).replace(JwtProperties.TOKEN_PREFIX, "");
        String email = JwtTokenProvider.getEmail(token);
        return userService.getUserInfoByEmail(email);
    }
}
