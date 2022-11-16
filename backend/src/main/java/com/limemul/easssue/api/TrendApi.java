package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.trend.TrendResDto;
import com.limemul.easssue.entity.Trend;
import com.limemul.easssue.repo.TrendRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

import static com.limemul.easssue.util.ScheduledTasks.getTrendList;

@RestController
@RequestMapping("/trend")
@RequiredArgsConstructor
@Slf4j
public class TrendApi {

    private final TrendRepo trendRepo;

    /**
     * DB에 저장된 네이트 실시간 트렌드 조회
     */
    @GetMapping("/v2")
    public TrendResDto getTrendFromDb(){
        log.info("[Starting request] GET /trend/v2");

        List<Trend> trendList = trendRepo.findTop10ByOrderByIdDesc()
                .stream().sorted(Comparator.comparingInt(Trend::getRanking)).toList();

        log.info("[Finished request] GET /trend/v2");
        return new TrendResDto(trendList);
    }

    /**
     * 네이트 실시간 트렌드 조회
     */
    @GetMapping
    public TrendResDto getTrend(){
        log.info("[Starting request] GET /trend");
        log.info("[Finished request] GET /trend");
        return new TrendResDto(getTrendList());
    }

    /**
     * 네이트 실시간 트렌드 수동 갱신
     */
    @PostMapping
    public boolean insertTrend(){
        log.info("[Starting request] POST /trend");

        List<Trend> trendList = getTrendList();
        List<Trend> result = trendRepo.saveAll(trendList);

        log.info("[Finished request] POST /trend");
        return result.size() == 10;
    }
}
