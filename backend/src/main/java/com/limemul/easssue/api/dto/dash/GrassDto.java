package com.limemul.easssue.api.dto.dash;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GrassDto {

    private String startDate;
    private String endDate;
    private List<GrassValueDto> values;

    public GrassDto(List<GrassValueDto> heatMapInfo) {
        //todo heatMapInfo.size()==0 일때 어떻게 할지 프론트랑 이야기
        if(heatMapInfo.size()<=0) return;
        this.startDate=heatMapInfo.get(0).getDate();
        this.endDate=heatMapInfo.get(heatMapInfo.size()-1).getDate();
        this.values=heatMapInfo;
    }
}
