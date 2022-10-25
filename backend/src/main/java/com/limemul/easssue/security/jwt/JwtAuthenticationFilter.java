package com.limemul.easssue.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemonmul.gamulgamul.api.dto.user.LoginRequestDto;
import com.lemonmul.gamulgamul.api.dto.user.LoginResponseDto;
import com.lemonmul.gamulgamul.security.auth.PrincipalDetails;
import com.lemonmul.gamulgamul.security.redis.RedisService;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Objects;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final AuthenticationManager authenticationManager;
    private final RedisService redisService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, RedisService redisService) {
        super(new AntPathRequestMatcher("/user/login"));
        this.authenticationManager = authenticationManager;
        this.redisService = redisService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {

        if (!request.getMethod().equals("POST")) {
            request.setAttribute("exception", "AuthenticationServiceException");
            throw new AuthenticationServiceException("msg");
        }

        ObjectMapper om = new ObjectMapper();

        LoginRequestDto loginRequestDto = om.readValue(request.getInputStream(), LoginRequestDto.class);

        Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        Objects.requireNonNull(loginRequestDto).getEmail(),
                        loginRequestDto.getPwd());

        try {
            return authenticationManager.authenticate(authenticationToken);
        } catch (AuthenticationException e) {
            e.printStackTrace();
            request.setAttribute("exception", "AuthenticationException");

            if (e instanceof BadCredentialsException) {
                throw new BadCredentialsException("msg");
            } else if (e instanceof UsernameNotFoundException) {
                throw new UsernameNotFoundException("msg");
            } else if (e instanceof AccountExpiredException) {
                throw new AccountExpiredException("msg");
            } else if (e instanceof CredentialsExpiredException) {
                throw new CredentialsExpiredException("msg");
            } else if (e instanceof DisabledException) {
                throw new DisabledException("msg");
            } else if (e instanceof LockedException) {
                throw new LockedException("msg");
            } else {
                throw new IOException("msg");
            }
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException {

        ObjectMapper ob = new ObjectMapper();

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String accessToken = JwtTokenProvider.createToken(principalDetails, JwtProperties.ACCESS_EXPIRATION_TIME);
        accessToken = JwtProperties.TOKEN_PREFIX + accessToken;

        String refreshToken = JwtTokenProvider.createToken(principalDetails, JwtProperties.REFRESH_EXPIRATION_TIME);
        refreshToken = JwtProperties.TOKEN_PREFIX + refreshToken;
        redisService.setValues(principalDetails.getUsername(), refreshToken, Duration.ofMillis(JwtProperties.REFRESH_EXPIRATION_TIME));

        LoginResponseDto loginResponseDto = new LoginResponseDto(accessToken, refreshToken);
        String loginResponse = ob.writeValueAsString(loginResponseDto);

        response.getWriter().write(loginResponse);
    }
}
