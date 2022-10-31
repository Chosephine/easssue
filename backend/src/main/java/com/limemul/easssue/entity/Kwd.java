package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Kwd {

    @Column(name = "kwd_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "kwd_name")
    private String name;

    @OneToMany(mappedBy = "kwd")
    private List<ArticleKwd> articleKwds = new ArrayList<>();

}
