package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.popup.PopupReqDto;
import com.limemul.easssue.api.dto.popup.PopupResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
@Slf4j
public class PopupApi {

//    @GetMapping("/v1")
//    public PopupResDto getPopupInfoV1(@RequestBody PopupReqDto popupReqDto){
//        log.info("[Starting request] GET /popup/v1");
//
//        String url = popupReqDto.getUrl();
//        log.info("Requested url is [{}]",url);
//
//        Path path= Paths.get("");
//        log.info("Current work space: {}", path.toAbsolutePath());
//
//        StringBuilder cloud=new StringBuilder("/home/ubuntu/easssue/resource/word_cloud/");
//        StringBuilder summary= new StringBuilder();
//
//        String[] command = new String[3];
//        command[0] = "python3";
//        command[1] = "/home/ubuntu/easssue/py/url_to_summary.py";
//        command[2] = url;
//
//        try {
//            String result=execPython(command);
//            String[] split = result.split("\n");
//            int len = split.length - 1;
//            cloud.append(split[len]).append(".png");
//            for(int i=0;i< len-1;i++){
//                summary.append(split[i]);
//            }
//            return new PopupResDto(cloud.toString(), summary.toString());
//        } catch (Exception e) {
//            e.printStackTrace();
//            //todo 파이썬 에러 났을때 프론트에 넘겨줄 값 이야기
//            return new PopupResDto();
//        }
//    }
//
//    public String execPython(String[] command) throws IOException {
//        CommandLine commandLine = CommandLine.parse(command[0]);
//        for (int i = 1; i < command.length; i++) {
//            commandLine.addArgument(command[i]);
//        }
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
//        DefaultExecutor executor = new DefaultExecutor();
//        executor.setStreamHandler(pumpStreamHandler);
//
//        int result = executor.execute(commandLine);
//        log.info("result: {}",result);
//        log.info("output: {}",outputStream);
//
//        return outputStream.toString();
//    }

    @GetMapping("/v2")
    public PopupResDto getPopupInfoV2(@RequestBody PopupReqDto popupReqDto){
        log.info("[Starting request] GET /popup/v2");

        String url = popupReqDto.getUrl();
        log.info("Requested url is [{}]",url);

        Path path= Paths.get("");
        log.info("Current work space: {}", path.toAbsolutePath());

        StringBuilder cloud=new StringBuilder("https://k7d102.p.ssafy.io/resource/popup/wordcloud/");
        List<String> summary;
        List<String> result=new ArrayList<>();

        List<String> command = new ArrayList<>();
        command.add("python3");
        command.add("src/main/resources/popup/url_to_summary.py");
        command.add(url);

        ProcessBuilder builder=new ProcessBuilder(command);
        builder.redirectErrorStream(true);
        try {
            long start = System.currentTimeMillis();

            Process process = builder.start();
            int exitVal = process.waitFor();

            BufferedReader br=new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));

            //todo 이걸 이렇게 하드코딩하는게 맞나...
            String line;
            int idx=0;
            while ((line=br.readLine())!=null){
                log.info(">>> {}: {} [{}ms]",++idx,line,(System.currentTimeMillis()-start));
                result.add(line);
            }
            log.info("br.readLine() duration: {}",(System.currentTimeMillis()-start));

            int size = result.size();
            cloud.append(result.get(size -1)).append(".png");
            summary=result.subList(size-4,size-1);

            if(exitVal!=0){
                log.info("exit value is not 0. exitVal: {}",exitVal);
                return new PopupResDto();
            }
            log.info("[Finished request] GET /popup/v2");
            return new PopupResDto(cloud.toString(),summary);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
