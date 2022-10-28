package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.news.ArticleDto;
import com.limemul.easssue.api.dto.news.PopularDto;
import com.limemul.easssue.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
public class NewsApi {

    private final ArticleService articleService;

    /**
     * 인기기사 page = 0
     */
    @GetMapping("/popular")
    public PopularDto firstPopularNews(){
        log.info("[Starting request] GET /popular");
        return articleService.getPopularArticle(0);
    }

    /**
     * 인기기사 page > 0
     */
    @GetMapping("/popular/page/{page}")
    public PopularDto popularNews(@PathVariable Integer page){
        return articleService.getPopularArticle(page);
    }

}
