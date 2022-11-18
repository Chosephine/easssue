package com.limemul.easssue.service;

import com.limemul.easssue.api.dto.kwd.KwdDto;
import com.limemul.easssue.api.dto.news.ArticleDto;
import com.limemul.easssue.api.dto.news.KwdArticleDto;
import com.limemul.easssue.api.dto.news.ArticleListDto;
import com.limemul.easssue.entity.*;
import com.limemul.easssue.repo.ArticleKwdRepo;
import com.limemul.easssue.repo.ArticleRepo;
import com.limemul.easssue.repo.RelKwdRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepo articleRepo;
    private final RelKwdRepo relKwdRepo;
    private final ArticleKwdRepo articleKwdRepo;

    private static final int articlesSize = 6;

    public ArticleListDto getPopularArticle(Integer page){
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1L);
        log.info("yesterday: {}", yesterday);
        Pageable pageable= PageRequest.of(page, articlesSize);
        Slice<Article> articles = articleRepo.findByPubDateAfterOrderByHitDesc(yesterday,pageable);

        List<ArticleDto> articleDtoList = articles.stream().map(ArticleDto::new).collect(Collectors.toList());
        return new ArticleListDto(articleDtoList, page, articles.isLast());
    }

    /**
     * 금지 키워드 제외한 인기 기사 리스트 조회
     *  최근 하루동안 올라온 기사
     *  조회수 내림차순 정렬
     *  해당 사용자의 금지 키워드 포함하는 기사 제외한 기사 리스트 반환
     */
    public ArticleListDto getPopularArticleExcludeBanKwd(User user,int page) {
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1L);
        log.info("yesterday: {}", yesterday);
        Pageable pageable = PageRequest.of(page, articlesSize);
        Slice<Article> articles = articleRepo.findByPubDateAfterNotInBanKwdOrderByHitDesc(user, yesterday, pageable);

        List<ArticleDto> articleDtoList = articles.stream().map(ArticleDto::new).collect(Collectors.toList());
        return new ArticleListDto(articleDtoList, page, articles.isLast());
    }

    public KwdArticleDto getSubsArticle(Kwd kwd, Integer page){
        // 연관키워드 리스트 (최신 5개)
        Pageable relKwdPageable=PageRequest.of(0,5, Sort.by("regDate").descending());
        List<Kwd> relKwds = relKwdRepo.findDistinctByFromKwd(kwd,relKwdPageable);
        List<KwdDto> relKwdDtoList = relKwds.stream().map(KwdDto::new).collect(Collectors.toList());

        // 기사 리스트
        Pageable pageable = PageRequest.of(page, articlesSize);

        Slice<ArticleKwd> articleKwdList = articleKwdRepo.findAllByKwdOrderByPubDateDesc(kwd, pageable);
        List<Article> kwdArticleList=new ArrayList<>();
        for (ArticleKwd articleKwd : articleKwdList) {
            kwdArticleList.add(articleKwd.getArticle());
        }
        List<ArticleDto> articleDtoList = kwdArticleList.stream().map(ArticleDto::new).collect(Collectors.toList());

        return new KwdArticleDto(relKwdDtoList, articleDtoList, page, articleKwdList.isLast());
    }

    public ArticleListDto getRecommendedArticle(Kwd kwd, Integer page){
        // 기사 리스트
        Pageable pageable = PageRequest.of(page, articlesSize);

        Slice<ArticleKwd> articleKwdList = articleKwdRepo.findAllByKwdOrderByPubDateDesc(kwd, pageable);
        List<Article> kwdArticleList=new ArrayList<>();
        for (ArticleKwd articleKwd : articleKwdList) {
            kwdArticleList.add(articleKwd.getArticle());
        }
        List<ArticleDto> articleDtoList = kwdArticleList.stream().map(ArticleDto::new).collect(Collectors.toList());

        return new ArticleListDto(articleDtoList, page, articleKwdList.isLast());
    }

    /**
     * 기사 조회수 올리기
     */
    @Transactional
    public void updateHit(Long articleId) {
        Optional<Article> optionalArticle = articleRepo.findById(articleId);
        if(optionalArticle.isEmpty()){
            throw new IllegalArgumentException("존재하지 않는 기사입니다.");
        }

        Article article = optionalArticle.get();
        article.updateHit();
    }
}
