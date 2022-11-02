package com.limemul.easssue.api.dto.news;

import com.limemul.easssue.entity.Article;
import com.limemul.easssue.entity.ArticleKwd;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ArticleDto {

    private Long newsId;

    private String title;

    private String link;

    private LocalDateTime pubDate;

    private String summary;

    private String img;

    private List<String> keywords;

    public ArticleDto(Article article){
        newsId = article.getId();
        title = article.getTitle();
        link = article.getLink();
        pubDate = article.getPubDate();
        img = article.getImg();
        keywords = new ArrayList<>();
        List<ArticleKwd> articleKwds = article.getArticleKwds();
        for (ArticleKwd articleKwd : articleKwds) {
            keywords.add(articleKwd.getKwd().getName());
        }
    }

}
