package com.limemul.easssue.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lemonmul.gamulgamul.exhandler.ErrorResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Component
@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        String exception = (String) request.getAttribute("exception");
        String msg;

        log.info("CustomAuthentication: {}", authException.getMessage());

        if(exception == null){
            msg = "토큰이 없습니다.";
        } else if(exception.equals("IllegalArgumentException")) {
            msg = "토큰의 내용이 비어있습니다.";
        } else if(exception.equals("SignatureException")) {
            msg = "잘못된 key값입니다.";
        } else if(exception.equals("ExpiredJwtException")) {
            msg = "만료된 토큰입니다.";
        } else if(exception.equals("NullPointerException")) {
            msg = "해당 객체가 Null입니다.";
        } else if(exception.equals("AuthenticationServiceException")) {
            msg = "지원하지 않는 Method입니다.";
        } else if(exception.equals("AuthenticationException")) {
            msg = "인증에 실패했습니다.";
        } else if(exception.equals("IOException")) {
            msg = "입출력 과정에서 예외가 발생했습니다.";
        } else if(exception.equals("Exception")) {
            msg = "예외가 발생했습니다.";
        } else {
            msg = "알 수 없는 예외가 발생했습니다.";
        }

        setResponse(response, msg);
    }

    private void setResponse(HttpServletResponse response, String msg) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ObjectMapper ob = new ObjectMapper();
        ob.registerModule(new JavaTimeModule());

        ErrorResult errorResult = ErrorResult.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .error(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .message(msg)
                .build();

        System.out.println(errorResult);

        String errorResponse = ob.writeValueAsString(errorResult);

        response.getWriter().write(errorResponse);
    }
}
