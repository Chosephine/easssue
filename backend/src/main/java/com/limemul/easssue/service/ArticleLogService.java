package com.limemul.easssue.service;

import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleLog;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.repo.ArticleLogRepo;
import com.limemul.easssue.repo.ArticleRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArticleLogService {

    private final ArticleLogRepo articleLogRepo;
    private final ArticleRepo articleRepo;

    /**
     *
     */
    public List<GraphValueDto> getRadialGraphInfo(User user){
        return articleLogRepo.countByUserAndClickTimeAfterGroupByCategory(user, LocalDateTime.now().minusWeeks(1L));
    }

    /**
     *
     */
    public List<GrassValueDto> getCalendarHeatMapInfo(User user){
        return articleLogRepo.countByUserAndClickTimeAfterGroupByClickTime(user,LocalDateTime.now().minusMonths(1L));
    }

    /**
     * 읽은 기사 로그 남기기
     *  현재 시간에 해당 유저가 해당 기사 읽었다는 로그 저장
     */
    @Transactional
    public ArticleLog logReadArticle(User user,Long articleId){
        Article article = articleRepo.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기사입니다."));

        return articleLogRepo.save(ArticleLog.of(user,article));
    }
}
