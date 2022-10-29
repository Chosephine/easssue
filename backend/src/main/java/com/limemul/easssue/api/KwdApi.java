package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.kwd.KwdListDto;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import com.limemul.easssue.service.KwdService;
import com.limemul.easssue.service.UserKwdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KwdApi {

    private final KwdService kwdService;
    private final UserService userService;
    private final UserKwdService userKwdService;

    @GetMapping("/user")
    public KwdListDto getUserKwd(@RequestHeader HttpHeaders headers){
        //todo 사용자 정보 불러오기
        User user = getUserFromJwt(userService, headers);

        List<UserKwd> userKwdList = userKwdService.getUserKwdList(user);

        return new KwdListDto(userKwdList);
    }

    @GetMapping("/recommend")
    public KwdListDto getRecKwd(@RequestHeader HttpHeaders headers){
        //todo 사용자 정보 불러오기
        User user = getUserFromJwt(userService, headers);

    }

    @PutMapping("/update")
    public boolean updateUserKwd(@RequestHeader HttpHeaders headers, @RequestBody KwdListDto kwdListDto){
        //todo 본인 리스트인지 확인



    }
}
