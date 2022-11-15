package com.limemul.easssue.util;

import com.limemul.easssue.entity.Trend;
import com.limemul.easssue.repo.TrendRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduledTasks {

    private final TrendRepo trendRepo;
    private final static String programPath = "src/main/resources/trend_crawling.py";

    /**
     * 네이트 트렌드 불러와서 DB에 저장
     *  10분 마다 갱신
     */
    @Scheduled(cron = "0 0/1 * * * *")
//    @Scheduled(cron = "0 0/10 * * * *")
//    @Transactional
    public void getNateTrends(){
        log.info("[Starting request] Scheduled - getNateTrends");
        List<String> trendList = getTrendList();
        List<Trend> result=new ArrayList<>();
        for (String trend : trendList) {
            String[] split = trend.split(" ");
            result.add(Trend.of(Integer.getInteger(split[0]),split[1]));
        }
        trendRepo.saveAll(result);
        log.info("[Finished request] Scheduled - getNateTrends");
    }

    //======================================================================

    /**
     * 네이트 트렌드 크롤링한 결과 반환
     * todo 함수로 빼기
     */
    private List<String> getTrendList() {
        List<String> result=new ArrayList<>();

        List<String> command = new ArrayList<>();
        command.add("python3");
        command.add(programPath);

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

            //비정상 종료 시, 빈 리스트 반환
            if(exitVal!=0){
                log.info("exit value is not 0. exitVal: {}",exitVal);
                return new ArrayList<>();
            }
            return result;
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
