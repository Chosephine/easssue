package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trend {

    @Column(name = "trend_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int ranking;

    private String title;

    private LocalDateTime regDate;

    private Trend(int ranking, String title) {
        this.ranking = ranking;
        this.title = title;
        this.regDate=LocalDateTime.now();
    }

    public static Trend of(int ranking,String title){
        return new Trend(ranking,title);
    }
}
