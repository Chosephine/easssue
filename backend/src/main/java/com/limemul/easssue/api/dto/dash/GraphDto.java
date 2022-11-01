package com.limemul.easssue.api.dto.dash;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GraphDto {

    /** 카테고리 이름 */
    private List<String> labels;
    /** 카테고리 별 최근 일주일 동안 읽은 기사 수 */
    private List<Long> data;

    public GraphDto(List<GraphValueDto> graphInfo) {
        //todo graphInfo.size()==0 일때 어떻게 할지 프론트와 이야기
        this.labels=graphInfo.stream().map(GraphValueDto::getLabel).toList();
        this.data=graphInfo.stream().map(GraphValueDto::getData).toList();
    }
}
