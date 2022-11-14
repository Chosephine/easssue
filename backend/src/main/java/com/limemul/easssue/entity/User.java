package com.limemul.easssue.entity;

import com.limemul.easssue.api.dto.user.UserInfoDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String pwd;

    private String wordCloudImg;

    private User(String email, String pwd) {
        this.email = email;
        this.pwd = pwd;
    }

    public static User of(String email, String pwd){
        return new User(email, pwd);
    }

    public void setWordCloudImg(String wordCloudImg) {
        this.wordCloudImg = wordCloudImg;
    }
}
