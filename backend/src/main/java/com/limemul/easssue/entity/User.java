package com.limemul.easssue.entity;

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

    private Long oauthId;

    @Column(name = "user_name")
    private String name;

    private String picture;

    private String email;

    private String wordCloudImg;

    private User(Long oauthId, String name, String picture, String email, String wordCloudImg) {
        this.oauthId = oauthId;
        this.name = name;
        this.picture = picture;
        this.email = email;
        this.wordCloudImg = wordCloudImg;
    }

    public static User from(HttpServletRequest request){
        //todo request에서 정보 뽑아서 객체 생성
        Long oauthId=0L;
        String name="";
        String picture="";
        String email="";
        String wordCloudImg="";

        return new User(oauthId,name,picture,email,wordCloudImg);
    }
}
