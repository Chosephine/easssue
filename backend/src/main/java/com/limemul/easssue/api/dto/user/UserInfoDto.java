package com.limemul.easssue.api.dto.user;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInfoDto {

    private String id;
    private String email;
    private boolean verifiedEmail;
    private String picture;
}
