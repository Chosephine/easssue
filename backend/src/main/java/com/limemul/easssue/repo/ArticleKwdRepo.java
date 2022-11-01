package com.limemul.easssue.repo;

import com.limemul.easssue.entity.ArticleKwd;
import com.limemul.easssue.entity.Kwd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleKwdRepo extends JpaRepository<ArticleKwd, Long> {

    @EntityGraph(attributePaths = {"article"})
    Slice<ArticleKwd> findAllByKwdOrderByArticleDesc(Kwd kwd, Pageable pageable);

}
