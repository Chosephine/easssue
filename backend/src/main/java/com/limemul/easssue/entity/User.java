package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String profileId;

    private String fullName;

    private String givenName;

    private String familyName;

    private String profileImg;

    private String email;

    private String wordCloudImg;

    @Enumerated(EnumType.STRING)
    private Role role;

    private User(String profileId, String fullName, String givenName, String familyName, String profileImg, String email, String wordCloudImg, Role role) {
        this.profileId = profileId;
        this.fullName = fullName;
        this.givenName = givenName;
        this.familyName = familyName;
        this.profileImg = profileImg;
        this.email = email;
        this.wordCloudImg = wordCloudImg;
        this.role = role;

    }

    public static User of(String profileId, String fullName, String givenName, String familyName, String profileImg, String email, String wordCloudImg, Role role) {
        return new User(profileId, fullName, givenName, familyName, profileImg, email,wordCloudImg, role);
    }
}
