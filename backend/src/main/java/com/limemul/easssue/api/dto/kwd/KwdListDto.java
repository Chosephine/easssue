package com.limemul.easssue.api.dto.kwd;

import com.limemul.easssue.entity.Kwd;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KwdListDto {

    private List<KwdDto> kwdList;
}
