package com.limemul.easssue.api.dto.dash;

import com.limemul.easssue.entity.ArticleLog;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleDto {

    private String category;
    private String newsTitle;
    private String newsLink;

    public ArticleDto(ArticleLog articleLog) {
        this.category=articleLog.getCategory().getName();
        this.newsTitle=articleLog.getArticle().getTitle();
        this.newsLink=articleLog.getArticle().getLink();
    }
}
