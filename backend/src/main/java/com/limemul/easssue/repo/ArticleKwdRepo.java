package com.limemul.easssue.repo;

import com.limemul.easssue.entity.ArticleKwd;
import com.limemul.easssue.entity.Kwd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleKwdRepo extends JpaRepository<ArticleKwd, Long> {

    /**
     * 해당 키워드 가지는 기사들 조회
     *  날짜 내림차순 정렬, 키워드 빈도 2개 이하인 기사 제외
     */
    @Query("select ak from ArticleKwd ak join fetch ak.article a " +
            "where ak.kwd=:kwd and ak.count>2 order by a.pubDate desc")
    Slice<ArticleKwd> findAllByKwdOrderByPubDateDesc(@Param("kwd") Kwd kwd, Pageable pageable);
}
