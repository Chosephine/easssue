package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface ArticleRepo extends JpaRepository<Article, Long> {

    Slice<Article> findByPubDateAfterOrderByHitDesc(LocalDateTime pubDate, Pageable pageable);

    /**
     * 해당 사용자의 금지 키워드 포함하는 기사 제외한 기사 리스트 반환
     *  pubDate 이후 올라온 기사
     */
    @Query(value = "select a from Article a " +
            "where a not in (" +
            "   select ba from Article ba " +
            "   join ArticleKwd ak on ba=ak.article " +
            "   where ak.kwd in (" +
            "       select kwd from UserKwd " +
            "       where type='b' and user=:user" +
            "   )" +
            ") and a.pubDate>=:pubDate " +
            "order by a.hit desc")
    Slice<Article> findByPubDateAfterNotInBanKwdOrderByHitDesc(@Param("user") User user,
                                                               @Param("pubDate") LocalDateTime pubDate,
                                                               Pageable pageable);
}
