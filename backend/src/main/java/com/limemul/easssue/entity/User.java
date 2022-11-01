package com.limemul.easssue.entity;

import com.limemul.easssue.api.dto.user.UserInfoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oauthId;

    private String email;

    private String picture;

    private String wordCloudImg;

    public User(String oauthId, String email, String picture) {
        this.oauthId = oauthId;
        this.email = email;
        this.picture = picture;
    }

    public static User from(UserInfoDto userInfoDto){
        String oauthId= userInfoDto.getId();
        String email= userInfoDto.getEmail();
        String picture= userInfoDto.getPicture();

        return new User(oauthId,email,picture);
    }
}
