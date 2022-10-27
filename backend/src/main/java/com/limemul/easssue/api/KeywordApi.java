package com.limemul.easssue.api;

import com.limemul.easssue.api.dto.kwd.KwdListDto;
import com.limemul.easssue.service.KwdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
public class KeywordApi {

    private final KwdService kwdService;

//    @GetMapping("/user")
//    public KwdListDto getUserKwd(@RequestHeader HttpHeaders headers){
//        //사용자 정보 불러오기
//
//
//    }
//
//    @PutMapping("/update")
//    public boolean updateUserKwd(@RequestHeader HttpHeaders headers, @RequestBody KwdListDto kwdListDto){
//        //todo 본인 리스트인지 확인
//
//
//    }
}
