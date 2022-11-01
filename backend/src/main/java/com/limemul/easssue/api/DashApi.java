package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.dash.DashResDto;
import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.ArticleLogService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dash")
@RequiredArgsConstructor
@Slf4j
public class DashApi {

    private final UserService userService;
    private final ArticleLogService articleLogService;

    /**
     * 대시보드 방사형 그래프, 워드 클라우드, 캘린더 히트맵 조회
     *  [로그인 o]
     *  [로그인 x]
     */
    @GetMapping("/info")
    public DashResDto getDashVisualization(@RequestHeader HttpHeaders headers){
        log.info("[Starting request] GET /dash/info");

        //사용자 정보 불러오기
        Optional<User> optionalUser = JwtProvider.getUserFromJwt(userService, headers);

        //로그인 안하면 todo...??
        if(optionalUser.isEmpty()){

        }

        User user = optionalUser.get();

        //방사형 그래프
        List<GraphValueDto> radialGraphInfo = articleLogService.getRadialGraphInfo(user);

        //워드 클라우드
        String cloud=user.getWordCloudImg();

        //캘린더 히트맵
        List<GrassValueDto> calendarHeatMapInfo = articleLogService.getCalendarHeatMapInfo(user);

        log.info("[Finished request] GET /dash/info");
        return new DashResDto(radialGraphInfo,cloud,calendarHeatMapInfo);
    }
}
