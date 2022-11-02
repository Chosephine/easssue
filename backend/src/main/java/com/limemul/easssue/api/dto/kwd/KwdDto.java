package com.limemul.easssue.api.dto.kwd;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.RelKwd;
import com.limemul.easssue.entity.UserKwd;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KwdDto {

    private Long kwdId;
    private String kwdName;

    public KwdDto(Kwd kwd){
        kwdId=kwd.getId();
        kwdName=kwd.getName();
    }

    public KwdDto(UserKwd kwd) {
        kwdId=kwd.getKwd().getId();
        kwdName=kwd.getKwd().getName();
    }

    public KwdDto(RecKwd kwd){
        kwdId=kwd.getKwd().getId();
        kwdName=kwd.getKwd().getName();
    }

    public KwdDto(RelKwd kwd){
        kwdId=kwd.getToKwd().getId();
        kwdName=kwd.getToKwd().getName();
    }
}
