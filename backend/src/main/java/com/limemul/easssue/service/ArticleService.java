package com.limemul.easssue.service;

import com.limemul.easssue.api.dto.news.ArticleDto;
import com.limemul.easssue.api.dto.news.PopularDto;
import com.limemul.easssue.entity.Article;
import com.limemul.easssue.repo.ArticleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepo articleRepo;

    private final Integer articlesSize = 6;

    public PopularDto getPopularArticle(Integer page){
        LocalDateTime now = LocalDateTime.now();
        log.info("now datetime is {}", now);
        Pageable pageable= PageRequest.of(page, articlesSize);
        Slice<Article> articles = articleRepo.findByPubDateAfterOrderByHitDesc(now.minusDays(1),pageable);
        List<ArticleDto> articleDtoList = articles.stream().map(ArticleDto::new).collect(Collectors.toList()); // ArticleDto
        return new PopularDto(articleDtoList, page, articles.isLast());


    }
}
