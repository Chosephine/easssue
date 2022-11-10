package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleKwd;
import com.limemul.easssue.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface ArticleRepo extends JpaRepository<Article, Long> {

    Slice<Article> findByPubDateAfterOrderByHitDesc(LocalDateTime pubDate, Pageable pageable);

//    Slice<Article> findAllByArticleKwdsIsNotInOrderByHitDesc(Collection<List<ArticleKwd>> banKwdList, Pageable pageable);

//    @Query(value = "select * from article a" +
//            " inner join article_kwd ak on a.article_id=ak.article_id and a.articleKwds not in :kwdIds" +
//            " order by a.hit desc", nativeQuery = true)
//    Slice<Article> findByArticleAndKwdOrderByHit(@Param("kwdIds") List<Long> kwdIds, Pageable pageable);

    @Query("select a from Article a where a not in (select a2 from Article a2 join ArticleKwd ak on a2=ak.article where ak.kwd in (select kwd from UserKwd where type='b' and user=:user)) and a.pubDate>=:pubDate order by a.hit desc limit")
    List<Article> findByPubDateAfterNotInBanKwdOrderByHitDesc(@Param("user") User user,@Param("pubDate") LocalDateTime pubDate,@Param("page") int page);
}
