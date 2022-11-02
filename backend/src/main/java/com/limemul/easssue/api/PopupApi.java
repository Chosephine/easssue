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

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
@Slf4j
public class PopupApi {

    @GetMapping
    public PopupResDto getPopupInfo(@RequestBody PopupReqDto popupReqDto){
        log.info("[Starting request] GET /popup");

        String url = popupReqDto.getUrl();
        log.info("Requested url is [{}]",url);

        StringBuilder cloud=new StringBuilder("/home/ubuntu/easssue/resource/word_cloud/");
        StringBuilder summary= new StringBuilder();

        String[] command = new String[3];
        command[0] = "python3";
        command[1] = "/home/ubuntu/easssue/py/url_to_summary.py";
        command[2] = url;

        try {
            String result=execPython(command);
            String[] split = result.split("\n");
            int len = split.length - 1;
            cloud.append(split[len]).append(".png");
            for(int i=0;i< len-1;i++){
                summary.append(split[i]);
            }
            return new PopupResDto(cloud.toString(), summary.toString());
        } catch (Exception e) {
            e.printStackTrace();
            //todo 파이썬 에러 났을때 프론트에 넘겨줄 값 이야기
            return new PopupResDto();
        }
    }

    public String execPython(String[] command) throws IOException {
        CommandLine commandLine = CommandLine.parse(command[0]);
        for (int i = 1; i < command.length; i++) {
            commandLine.addArgument(command[i]);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
        DefaultExecutor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);

        int result = executor.execute(commandLine);
        log.info("result: {}",result);
        log.info("output: {}",outputStream);

        return outputStream.toString();
    }
}
