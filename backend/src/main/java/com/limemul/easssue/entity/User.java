package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    private String profileName;

    private String profileImg;

    private String email;

    private String wordCloudImg;

    @Enumerated(EnumType.STRING)
    private Role role;

    private User(String profileId, String profileName, String profileImg, String email, Role role) {
        this.profileId = profileId;
        this.profileName = profileName;
        this.profileImg = profileImg;
        this.email = email;
        this.role = role;
    }

    public static User of(String profileId, String profileName, String profileImg, String email,  Role role) {
        return new User(profileId, profileName, profileImg, email, role);
    }

    public User update(String name, String picture, String email) {
        this.profileName = name;
        this.profileImg = picture;
        this.email = email;

        return this;
    }
    public String getRoleKey() {
        return this.role.toString();
    }
}
