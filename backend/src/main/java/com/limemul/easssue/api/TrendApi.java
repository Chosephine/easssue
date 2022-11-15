package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.trend.TrendResDto;
import com.limemul.easssue.entity.Trend;
import com.limemul.easssue.repo.TrendRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/trend")
@RequiredArgsConstructor
@Slf4j
public class TrendApi {

    private final TrendRepo trendRepo;

    /**
     * DB에 저장된 네이트 실시간 트렌드 조회
     */
    @GetMapping
    public TrendResDto getTrend(){
        log.info("[Starting request] GET /trend");

        List<Trend> trendList = trendRepo.findTop10ByOrderByIdDesc()
                .stream().sorted(Comparator.comparingInt(Trend::getRank)).toList();

        log.info("[Finished request] GET /trend");
        return new TrendResDto(trendList);
    }
}
