package com.limemul.easssue.security.jwt;

import com.limemul.easssue.api.dto.user.LoginResponseDto;
import com.limemul.easssue.repo.UserRepo;
import com.limemul.easssue.security.auth.PrincipalDetails;
import com.limemul.easssue.security.redis.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JwtRefreshService {

    private final UserRepo userRepo;
    private final RedisService redisService;

    // TODO: 예외 처리 다시 해야함
    public LoginResponseDto refreshAccessToken(String email, String refreshToken) throws Exception {
        String redisToken = redisService.getValues(email);
        if(!refreshToken.equals(redisToken))
            throw new Exception("refresh 토큰 만료");
        PrincipalDetails principalDetails = new PrincipalDetails(userRepo.findByEmail(email).orElseThrow());
        String accessToken = JwtTokenProvider.createToken(principalDetails, JwtProperties.ACCESS_EXPIRATION_TIME);
        accessToken = JwtProperties.TOKEN_PREFIX + accessToken;
        return new LoginResponseDto(accessToken, refreshToken);
    }
}
