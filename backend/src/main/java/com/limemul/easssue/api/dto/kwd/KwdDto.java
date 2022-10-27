package com.limemul.easssue.api.dto.kwd;

import com.limemul.easssue.entity.Kwd;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KwdDto {

    private Long kwdId;
    private String kwdName;
}
