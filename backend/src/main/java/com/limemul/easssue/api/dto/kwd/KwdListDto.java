package com.limemul.easssue.api.dto.kwd;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.UserKwd;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class KwdListDto {

    private List<KwdDto> kwdList=new ArrayList<>();

    public KwdListDto(List<KwdDto> kwdList) {
        this.kwdList=kwdList;
    }
}
