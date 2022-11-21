package com.limemul.easssue.api.dto.kwd;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class KwdUpdateDto {

    private List<KwdDto> subscKwdList;
    private List<KwdDto> banKwdList;
}
