package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.popup.PopupReqDto;
import com.limemul.easssue.api.dto.popup.PopupResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
@Slf4j
public class PopupApi {

    private final static String programPath = "src/main/resources/url_to_summary.py";
    private final static String imgPath = "https://www.easssue.com/resource/popup/";
    private final static String imgFormat = ".png";

    /**
     * 확장 프로그램 팝업창 워드 클라우드, 세줄 요약 조회
     *  (로그인 여부 관계 없이 호출 가능)
     */
    //todo 함수로 빼기
    @PostMapping
    public PopupResDto getPopupInfo(@RequestBody PopupReqDto popupReqDto){
        log.info("[Starting request] GET /popup");

        String requestUrl = popupReqDto.getUrl();
        log.info("Requested url is [{}]",requestUrl);

        Path path= Paths.get("");
        log.info("Current work space: {}", path.toAbsolutePath());

        StringBuilder cloud=new StringBuilder(imgPath);
        List<String> summary;
        List<String> result=new ArrayList<>();

        List<String> command = new ArrayList<>();
        command.add("python3");
        command.add(programPath);
        command.add(requestUrl);

        ProcessBuilder builder=new ProcessBuilder(command);
        builder.redirectErrorStream(true);
        try {
            long start = System.currentTimeMillis();

            Process process = builder.start();
            int exitVal = process.waitFor();

            BufferedReader br=new BufferedReader(new InputStreamReader(process.getInputStream(), UTF_8));

            String line;
            int idx=0;
            while ((line=br.readLine())!=null){
                log.info(">>> {}: {} [{}ms]",++idx,line,(System.currentTimeMillis()-start));
                result.add(line);
            }
            log.info("url to summary exec time: {}ms",(System.currentTimeMillis()-start));

            if(exitVal!=0){
                log.info("exit value is not 0. exitVal: {}",exitVal);
                log.info("[Finished request] GET /popup");
                return new PopupResDto();
            }

            int size = result.size();
            cloud.append(result.get(size-1)).append(imgFormat);
            summary=result.subList(0,size-1);

            log.info("[Finished request] GET /popup");
            return new PopupResDto(cloud.toString(),summary);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
