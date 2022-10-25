package com.limemul.easssue.security.jwt;

public interface JwtProperties {
    //TODO: secret key 값 정해야함
    String SECRET= "&er768uguy^%^*Ii";
    // 60 * 1000L = 1분
    long ACCESS_EXPIRATION_TIME= 1440 * 60 * 1000L;
    long REFRESH_EXPIRATION_TIME= 14 * 1440 * 60 * 1000L; // 1440분 = 24시간
    String TOKEN_PREFIX= "Bearer ";
    String HEADER_STRING= "Authorization";
}
