package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.news.ArticleDto;
import com.limemul.easssue.api.dto.news.PopularDto;
import com.limemul.easssue.entity.ArticleLog;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.ArticleLogService;
import com.limemul.easssue.service.ArticleService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
public class NewsApi {

    private final ArticleService articleService;
    private final UserService userService;
    private final ArticleLogService articleLogService;

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

    /**
     * 기사 로그 남기기
     *  [로그인 o] 해당 사용자가 언제 무슨 카테고리의 무슨 기사 읽었는지 로그 남기기
     *  (로그인 했을때만 호출)
     */
    @PostMapping("/log/{articleId}")
    public boolean logReadArticle(@RequestHeader HttpHeaders headers,@PathVariable Long articleId){
        log.info("[Starting request] POST /news/log/{}",articleId);

        //사용자 정보 불러오기
        Optional<User> optionalUser = JwtProvider.getUserFromJwt(userService, headers);

        //로그인 안하면 아무 작업 안함
        if(optionalUser.isEmpty()){
            return false;
        }

        //기사 로그 남기기
        User user = optionalUser.get();
        ArticleLog articleLog = articleLogService.logReadArticle(user, articleId);
        log.info("userId: {}, articleId: {}, clickTime: {}",user.getId(),articleId,articleLog.getClickTime());

        log.info("[Finished request] POST /news/log/{}",articleId);
        return true;
    }

    /**
     * 테스트용 사용자
     */
    private User getUser(Long userId) {
        return userService.getUserByEmail("user"+userId+"@xx.xx");
    }
}
