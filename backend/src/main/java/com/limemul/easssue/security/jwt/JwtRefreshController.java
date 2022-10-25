package com.limemul.easssue.security.jwt;

import com.limemul.easssue.api.dto.user.LoginResponseDto;
import com.limemul.easssue.api.dto.user.RefreshRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/refresh")
public class JwtRefreshController {

    private final JwtRefreshService jwtRefreshService;

    @GetMapping
    public LoginResponseDto refreshToken(@RequestBody RefreshRequestDto refreshRequestDto) throws Exception {
        return jwtRefreshService.refreshAccessToken(refreshRequestDto.getEmail(), refreshRequestDto.getRefreshToken());
    }
}
