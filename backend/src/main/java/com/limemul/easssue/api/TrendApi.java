package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.trend.TrendResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/trend")
@RequiredArgsConstructor
@Slf4j
public class TrendApi {

    private final static String programPath = "src/main/resources/trend_crawling.py";

    @GetMapping
    public TrendResDto getTrend(){
        return new TrendResDto(getTrendList());
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
