package com.limemul.easssue.api.dto.news;

import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleKwd;
import com.limemul.easssue.entity.Kwd;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
public class ArticleDto {

    private Long newsId;

    private String title;

    private String link;

    private LocalDateTime pubDate;

    private List<String> summary;

    private String img;

    private List<String> keywords;

    public ArticleDto(Article article){
        newsId = article.getId();
        title = article.getTitle();
        link = article.getLink();
        //서버 시간과 DB 시간이 9시간 차이나는 문제
        pubDate = article.getPubDate().plusHours(9L);
        summary = Arrays.stream(article.getSummary().split("\n")).toList();
        img = article.getImg();
        keywords = article.getArticleKwds().stream().sorted((o1, o2) -> o2.getCount() - o1.getCount())
                .limit(3).map(ArticleKwd::getKwd).map(Kwd::getName).toList();
    }

}
