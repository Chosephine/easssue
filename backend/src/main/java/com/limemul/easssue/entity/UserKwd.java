package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserKwd {

    @Column(name = "user_kwd_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kwd_id")
    private Kwd kwd;

    private UserKwd(User user, Kwd kwd) {
        this.user = user;
        this.kwd = kwd;
    }

    public static UserKwd of(User user,Kwd kwd){
        return new UserKwd(user,kwd);
    }
}
