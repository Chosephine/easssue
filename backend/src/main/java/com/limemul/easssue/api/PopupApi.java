package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.popup.PopupReqDto;
import com.limemul.easssue.api.dto.popup.PopupResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.nio.charset.StandardCharsets.*;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
@Slf4j
public class PopupApi {

    private final static String programPath = "src/main/resources/popup/url_to_summary.py";
    private final static String imgPath = "https://k7d102.p.ssafy.io/resource/popup/";
    private final static String imgFormat = ".png";

    @GetMapping
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

            //todo 이걸 이렇게 하드코딩하는게 맞나...
            String line;
            int idx=0;
            while ((line=br.readLine())!=null){
                log.info(">>> {}: {} [{}ms]",++idx,line,(System.currentTimeMillis()-start));
                result.add(line);
            }
            log.info("url to summary exec time: {}ms",(System.currentTimeMillis()-start));

            int size = result.size();
            cloud.append(result.get(size -1)).append(imgFormat);
            summary=result.subList(size-4,size-1);

            if(exitVal!=0){
                log.info("exit value is not 0. exitVal: {}",exitVal);
                log.info("[Finished request] GET /popup");
                return new PopupResDto();
            }
            log.info("[Finished request] GET /popup");
            return new PopupResDto(cloud.toString(),summary);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
