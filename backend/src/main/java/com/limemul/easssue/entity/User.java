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

    public User(String email, String pwd) {
        this.email = email;
        this.pwd = pwd;
    }

    public static User from(UserInfoDto userInfoDto){
        String email= userInfoDto.getEmail();
        String password= userInfoDto.getPwd();

        return new User(email, password);
    }

    public void setWordCloudImg(String wordCloudImg) {
        this.wordCloudImg = wordCloudImg;
    }

    //    public String getWordCloudImg() {
//        //todo 나중에 "emtpy"로 보내서 프론트에서 처리할수도
//        //사용자의 워드 클라우드 없으면 기본 이미지
//        return Objects.requireNonNullElse(wordCloudImg, "https://k7d102.p.ssafy.io/resource/default_cloud_img.png");
//    }
}
