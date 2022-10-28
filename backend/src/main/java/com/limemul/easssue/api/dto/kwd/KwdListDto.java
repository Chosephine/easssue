package com.limemul.easssue.api.dto.kwd;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.UserKwd;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KwdListDto {

    private List<KwdDto> kwdList;

    public KwdListDto(List<UserKwd> userKwdList) {
        kwdList=userKwdList.stream().map(KwdDto::new).toList();
    }
}
