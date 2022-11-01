package com.limemul.easssue.repo;

import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.entity.ArticleLog;
import com.limemul.easssue.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface ArticleLogRepo extends JpaRepository<ArticleLog,Long> {

    /**
     *
     */
    @Query(value = "select c.category_name as label,count(*) as data from article_log al " +
            "left outer join category c on c.category_id=al.category_id " +
            "where al.user_id=:user and al.click_time>:click_time group by al.category_id order by al.category_id",
            nativeQuery = true)
    List<GraphValueDto> countByUserAndClickTimeAfterGroupByCategory(@Param("user") User user, @Param("click_time") LocalDateTime clickTime);

    /**
     *
     */
    @Query(value = "select date_format('click_time','%Y-%m-%d') as date, count(*) as count from article_log " +
            "where user_id=:user and click_time>:click_time group by date order by date",nativeQuery = true)
    List<GrassValueDto> countByUserAndClickTimeAfterGroupByClickTime(@Param("user") User user, @Param("click_time") LocalDateTime clickTime);
}
