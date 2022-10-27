package com.limemul.easssue.security;

import com.limemul.easssue.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> customOAuth2UserService;
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                // URL별 권한 관리
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/api/v1/**").hasRole(Role.u.name()) // 이 url 은 user 만 접근 가능
                .anyRequest().authenticated() // anyRequest: 설정된 값들 이외 나머지 URL, authenticated: 인증된 사용자
                .and()
                .logout()
                .logoutSuccessUrl("/") // logout 성공 시 이동하는 주소
                .and()
                .oauth2Login()
                .userInfoEndpoint() // oauth2 로그인 성공 후 가져올 때 설정들
                // 소셜로그인 성공 시 후속 조치를 진행할 UserService 인터페이스 구현체 등록
                // 리소스 서버에서 사용자 정보를 가져온 상태에서 추가로 진행하고자 하는 기능 명시
                .userService(customOAuth2UserService);
        return http.build();
    }
}
