package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.dash.DashResDto;
import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.entity.Category;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.ArticleLogService;
import com.limemul.easssue.service.CategoryService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/dash")
@RequiredArgsConstructor
@Slf4j
public class DashApi {

    private final UserService userService;
    private final ArticleLogService articleLogService;
    private final CategoryService categoryService;

    /**
     * 대시보드 방사형 그래프, 워드 클라우드, 캘린더 히트맵 조회
     *  [로그인 o] 해당 사용자의 대시보드 시각화 관련 정보 반환
     *  (로그인 했을때만 호출)
     */
    @GetMapping("/info")
    public DashResDto getDashVisualization(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /dash/info");

        //사용자 정보 불러오기
        Optional<User> optionalUser = JwtProvider.getUserFromJwt(userService, headers);

        //로그인 안하면 예외 발생
        if(optionalUser.isEmpty()){
            throw new NoSuchElementException("로그인 후 사용할 수 있는 기능입니다.");
        }

        User user = optionalUser.get();

        //방사형 그래프
        List<Category> categories=categoryService.getAllCategories();
        List<GraphValueDto> radialGraphInfo = articleLogService.getRadialGraphInfo(user);

        //워드 클라우드
        String cloud=user.getWordCloudImg();

        //캘린더 히트맵
        List<GrassValueDto> calendarHeatMapInfo = articleLogService.getCalendarHeatMapInfo(user);

        log.info("[Finished request] GET /dash/info");
        return new DashResDto(categories,radialGraphInfo,cloud,calendarHeatMapInfo);
    }
}
