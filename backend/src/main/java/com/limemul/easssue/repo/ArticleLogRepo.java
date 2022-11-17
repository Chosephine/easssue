package com.limemul.easssue.repo;

import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleLog;
import com.limemul.easssue.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ArticleLogRepo extends JpaRepository<ArticleLog,Long> {

    /**
     * 해당 사용자의 카테고리별 읽은 기사 수 조회
     *  인자 clickTime 이후 읽은 기사 수
     *  카테고리 기본키 오름차순 정렬
     */
    @Query(value = "select al.category.id as id,count(al) as data from ArticleLog al " +
            "where al.user=:user and al.clickTime>:clickTime group by al.category.id order by al.category.id")
    List<GraphValueDto> countByUserAndClickTimeAfterGroupByCategory(
            @Param("user") User user, @Param("clickTime") LocalDateTime clickTime);

    /**
     * 해당 사용자의 날짜별 읽은 기사 수 조회
     *  인자 clickTime 이후 읽은 기사 수
     *  날짜 오름차순 정렬
     */
    @Query(value = "select date_format(click_time,'%Y-%m-%d') as date, count(*) as count from article_log " +
            "where user_id=:user and click_time>:clickTime group by date order by date",
            nativeQuery = true)
    List<GrassValueDto> countByUserAndClickTimeAfterGroupByClickTime(
            @Param("user") User user, @Param("clickTime") LocalDateTime clickTime);

    /**
     * 해당 사용자의 해당 날짜에 읽은 기사 정보 조회
     *  인자 clickTime 이후 읽은 기사 정보
     */
    @EntityGraph(attributePaths = {"article","category"})
    List<ArticleLog> findByUserAndClickTimeAfter(User user, LocalDateTime clickTime);

    /**
     * 해당 사용자가 해당 기사 이미 읽었는지 확인
     */
    Optional<ArticleLog> findByUserAndArticle(User user, Article article);
}
