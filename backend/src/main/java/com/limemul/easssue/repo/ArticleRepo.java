package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleKwd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface ArticleRepo extends JpaRepository<Article, Long> {

    Slice<Article> findByPubDateAfterOrderByHitDesc(LocalDateTime pubDate, Pageable pageable);

    Slice<Article> findAllByArticleKwdsIsNotInOrderByHitDesc(Collection<List<ArticleKwd>> banKwdList, Pageable pageable);
}
