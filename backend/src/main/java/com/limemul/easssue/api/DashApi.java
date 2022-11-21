package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.dash.DashResDto;
import com.limemul.easssue.api.dto.dash.GraphValueDto;
import com.limemul.easssue.api.dto.dash.GrassValueDto;
import com.limemul.easssue.api.dto.dash.NewsListDto;
import com.limemul.easssue.entity.ArticleLog;
import com.limemul.easssue.entity.Category;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.service.ArticleLogService;
import com.limemul.easssue.service.CategoryService;
import com.limemul.easssue.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/dash")
@RequiredArgsConstructor
@Slf4j
public class DashApi {

    private final UserService userService;
    private final ArticleLogService articleLogService;
    private final CategoryService categoryService;

    private final static String programPath = "src/main/resources/dashboard_wordcloud.py";
    private final static String imgPath = "https://www.easssue.com/resource/dash/";
    private final static String imgFormat = ".png";
    private final static String defaultDashImg = "https://www.easssue.com/resource/default_dash_img.gif";


    /**
     * 대시보드 방사형 그래프, 워드 클라우드, 캘린더 히트맵 & 오늘 읽은 기사 리스트 조회
     *  [로그인 o] 해당 사용자의 대시보드 시각화 관련 정보 & 오늘 읽은 기사 리스트 반환
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

        //방사형 그래프 (최근 일주일)
        List<Category> categories=categoryService.getAllCategories();
        List<GraphValueDto> radialGraphInfo = articleLogService.getRadialGraphInfo(user);

        //워드 클라우드 (최근 일주일)
        String cloud = getCloud(user);

        //캘린더 히트맵 (이번달)
        List<GrassValueDto> calendarHeatMapInfo = articleLogService.getCalendarHeatMapInfo(user);

        //오늘 읽은 기사 리스트
        List<ArticleLog> articleLogList = articleLogService.getArticleLogByReadDate(user, LocalDate.now());

        log.info("[Finished request] GET /dash/info");
        return new DashResDto(categories,radialGraphInfo,cloud,calendarHeatMapInfo,articleLogList);
    }

    /**
     * 대시보드 읽은 기사 리스트 조회
     *  [로그인 o] 캘린더 히트맵에서 선택한 날짜의 읽은 기사 리스트 반환
     *  (로그인 했을때만 호출)
     */
    @GetMapping("/news/{date}")
    public NewsListDto getDashNewsList(@RequestHeader HttpHeaders headers, @PathVariable String date){
        log.info("[Starting request] GET /dash/news/{}",date);

        //사용자 정보 불러오기
        Optional<User> optionalUser = JwtProvider.getUserFromJwt(userService, headers);

        //로그인 안하면 예외 발생
        if(optionalUser.isEmpty()){
            throw new NoSuchElementException("로그인 후 사용할 수 있는 기능입니다.");
        }

        User user = optionalUser.get();

        //해당 날짜의 읽은 기사 리스트
        List<ArticleLog> articleLogList = articleLogService.getArticleLogByReadDate(user, LocalDate.parse(date));

        log.info("[Finished request] GET /dash/news/{}",date);
        return new NewsListDto(articleLogList);
    }

    //======================================================================

    /**
     * 해당 사용자의 최근 일주일 동안 읽은 기사 키워드 바탕 워드 클라우드 작성
     * todo 함수로 빼기
     */
    private String getCloud(User user) {
        StringBuilder img=new StringBuilder(imgPath);
        List<String> result=new ArrayList<>();

        List<String> command = new ArrayList<>();
        command.add("python3");
        command.add(programPath);
        command.add(user.getId().toString());

        ProcessBuilder builder=new ProcessBuilder(command);
        builder.redirectErrorStream(true);
        try {
            Process process = builder.start();
            int exitVal = process.waitFor();

            BufferedReader br=new BufferedReader(new InputStreamReader(process.getInputStream(), UTF_8));

            String line;
            while ((line=br.readLine())!=null){
                log.info(">>> {}",line);
                result.add(line);
            }

            img.append(result.get(0)).append(imgFormat);

            //비정상 종료 시, 기본 이미지 반환
            if(exitVal!=0){
                log.info("exit value is not 0. exitVal: {}",exitVal);
                return defaultDashImg;
            }
            return img.toString();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return defaultDashImg;
        }
    }
}
