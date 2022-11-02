package com.limemul.easssue.api.dto.dash;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import static java.time.temporal.TemporalAdjusters.*;
import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GrassDto {

    /** 이번 달 첫 날 */
    private String startDate;
    /** 이번 달 마지막 날 */
    private String endDate;
    /** 이번 한 달의 날짜별 읽은 기사 수 */
    private List<GrassValueDto> values;

    public GrassDto(List<GrassValueDto> heatMapInfo) {
        LocalDate now = LocalDate.now();
        this.startDate=now.with(firstDayOfMonth()).toString();
        this.endDate=now.with(lastDayOfMonth()).toString();
        if(heatMapInfo.size()>0){
            this.values=heatMapInfo;
        }else{
            //이번 달에 읽은 기사 없을 시 빈 리스트 반환
            this.values=new ArrayList<>();
        }
    }
}
