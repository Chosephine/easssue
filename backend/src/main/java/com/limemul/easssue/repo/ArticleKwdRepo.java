package com.limemul.easssue.repo;

import com.limemul.easssue.entity.ArticleKwd;
import com.limemul.easssue.entity.Kwd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleKwdRepo extends JpaRepository<ArticleKwd, Long> {

    /**
     * 해당 키워드 가지는 기사들 조회
     *  날짜 내림차순 정렬, 키워드 빈도 내림차순 정렬
     */
    @Query("select ak from ArticleKwd ak join fetch ak.article a where ak.kwd=:kwd order by cast(a.pubDate as date) desc, ak.count desc")
    Slice<ArticleKwd> findAllByKwdOrderByCountDescArticleDesc(@Param("kwd") Kwd kwd, Pageable pageable);


}
