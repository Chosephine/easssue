package com.limemul.easssue.api;

import com.limemul.easssue.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
public class NewsApi {

    private final ArticleService articleService;


}
