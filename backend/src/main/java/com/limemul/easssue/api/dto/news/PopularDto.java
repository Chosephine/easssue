package com.limemul.easssue.api.dto.news;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PopularDto {


    private List<ArticleDto> newsList;

    private Integer page;

    private Boolean last;


}

