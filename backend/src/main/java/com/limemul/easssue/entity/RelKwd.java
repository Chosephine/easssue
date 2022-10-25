package com.limemul.easssue.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RelKwd {

    @Column(name = "rel_kwd_id")
    @Id
    private Long id;

    private LocalDate regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_kwd_id")
    private Kwd fromKwd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_kwd_id")
    private Kwd toKwd;
}
