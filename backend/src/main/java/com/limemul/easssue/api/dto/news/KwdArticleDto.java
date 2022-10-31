package com.limemul.easssue.api.dto.news;

import com.limemul.easssue.api.dto.kwd.KwdDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class KwdArticleDto {

    // 연관 키워드 리스트
    private List<KwdDto> kwdList;

    private List<ArticleDto> newsList;

    private Integer page;

    private Boolean last;


}
