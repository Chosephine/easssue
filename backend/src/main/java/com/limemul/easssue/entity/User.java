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

    private String fullName;

    private String givenName;

    private String familyName;

    private String profileImg;

    private String email;

    private String wordCloudImg;

    @Enumerated(EnumType.STRING)
    private Role role;
}
