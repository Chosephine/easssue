package com.lemonmul.gamulgamul.config;

import com.lemonmul.gamulgamul.repo.UserRepo;
import com.lemonmul.gamulgamul.security.CustomAuthenticationEntryPoint;
import com.lemonmul.gamulgamul.security.jwt.JwtAuthenticationFilter;
import com.lemonmul.gamulgamul.security.jwt.JwtAuthorizationFilter;
import com.lemonmul.gamulgamul.security.oauth2.*;
import com.lemonmul.gamulgamul.security.redis.RedisService;
import com.limemul.easssue.repo.UserRepo;
import com.limemul.easssue.security.jwt.JwtAuthenticationFilter;
import com.limemul.easssue.security.jwt.JwtAuthorizationFilter;
import com.limemul.easssue.security.oauth2.AppProperties;
import com.limemul.easssue.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.limemul.easssue.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.limemul.easssue.security.oauth2.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.limemul.easssue.security.redis.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RedisService redisService;

    @Autowired
    private AppProperties appProperties;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                appProperties,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }

    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()

                .addFilterBefore(new JwtAuthenticationFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class)), redisService), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtAuthorizationFilter(authenticationManager(http.getSharedObject(AuthenticationConfiguration.class))), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/user/signup").permitAll()
                .antMatchers("/user/check/**").permitAll()
                .antMatchers("/user/logout").permitAll()
                .antMatchers("/main").permitAll()
                .antMatchers("/refresh").permitAll()
                .anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorization")
                .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                .redirectionEndpoint()
                .baseUri("/*/oauth2/code/*")
                .and()
                .userInfoEndpoint()
                .userService(new CustomOAuth2UserService(userRepo))
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler());

        return http.build();
    }
}
