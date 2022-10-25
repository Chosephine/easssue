package com.limemul.easssue.api.dto.user;

import lombok.Data;
import lombok.Getter;

// 로그인 요청을 받는 Dto
@Data
@Getter
public class LoginRequestDto {
    private String email;
    private String pwd;
}
