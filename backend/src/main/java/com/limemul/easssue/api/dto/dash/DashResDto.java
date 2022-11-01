package com.limemul.easssue.api.dto.dash;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DashResDto {

    private GraphDto graph;
    private String cloud;
    private GrassDto grass;


    public DashResDto(List<GraphValueDto> radialGraphInfo, String cloud, List<GrassValueDto> calendarHeatMapInfo) {
        this.graph=new GraphDto(radialGraphInfo);
        this.cloud=cloud;
        this.grass=new GrassDto(calendarHeatMapInfo);
    }
}
