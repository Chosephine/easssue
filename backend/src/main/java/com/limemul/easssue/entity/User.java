package com.limemul.easssue.entity;

import com.limemul.easssue.api.dto.user.UserInfoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
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

    public void setWordCloudImg(String wordCloudImg) {
        this.wordCloudImg = wordCloudImg;
    }

    //    public String getWordCloudImg() {
//        //todo 나중에 "emtpy"로 보내서 프론트에서 처리할수도
//        //사용자의 워드 클라우드 없으면 기본 이미지
//        return Objects.requireNonNullElse(wordCloudImg, "https://k7d102.p.ssafy.io/resource/default_cloud_img.png");
//    }
}
