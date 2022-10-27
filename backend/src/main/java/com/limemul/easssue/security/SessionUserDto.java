package com.limemul.easssue.security;

import com.limemul.easssue.entity.User;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUserDto implements Serializable {

    private String username;
    private String email;
    private String picture;

    public SessionUserDto(User user){
        this.username = user.getProfileName();
        this.picture = user.getProfileImg();
        this.email = user.getEmail();
    }
}
