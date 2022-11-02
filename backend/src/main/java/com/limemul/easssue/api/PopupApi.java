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

    public static void main(String[] args)  {
        System.out.println("Python Call");
        String[] command = new String[3];
        command[0] = "python3";
        command[1] = "/home/ubuntu/easssue/py/url_to_summary.py";
        command[2] = "프론트에서 넘겨주는 url";
        try {
            execPython(command);
        } catch (Exception e) {
            e.printStackTrace();
            //todo 파이썬 에러 났을때 프론트에 넘겨줄 값 이야기
        }
    }

    @GetMapping
    public PopupResDto getPopupInfo(@RequestBody PopupReqDto popupReqDto){
        log.info("[Starting request] GET /popup");

        String url = popupReqDto.getUrl();
        log.info("Requested url is [{}]",url);

        String[] command = new String[3];
        command[0] = "python3";
        command[1] = "/home/ubuntu/easssue/py/url_to_summary.py";
        command[2] = url;
        try {
            execPython(command);
        } catch (Exception e) {
            e.printStackTrace();
            //todo 파이썬 에러 났을때 프론트에 넘겨줄 값 이야기
        }

        return new PopupResDto();
    }

    public static void execPython(String[] command) throws IOException {
        CommandLine commandLine = CommandLine.parse(command[0]);
        for (int i = 1, n = command.length; i < n; i++) {
            commandLine.addArgument(command[i]);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
        DefaultExecutor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);
        System.out.println(commandLine);
        int result = executor.execute(commandLine);
        System.out.println("result: " + result);
        System.out.println("output: " + outputStream);

    }
}
