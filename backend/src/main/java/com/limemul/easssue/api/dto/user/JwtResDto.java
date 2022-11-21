package com.limemul.easssue.api.dto.user;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class JwtResDto {

    private boolean status;
    private String accessToken;
    private String refreshToken;

}
