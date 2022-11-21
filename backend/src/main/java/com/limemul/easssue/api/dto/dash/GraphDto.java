package com.limemul.easssue.api.dto.dash;

import com.limemul.easssue.entity.Category;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GraphDto {

    /** 카테고리 이름 */
    private List<String> labels;
    /** 카테고리 별 최근 일주일 동안 읽은 기사 수 */
    private long[] data;

    public GraphDto(List<Category> categories, List<GraphValueDto> graphInfo) {
        this.labels=categories.stream().map(Category::getName).toList();
        this.data=new long[categories.size()];
        for (GraphValueDto graphValueDto : graphInfo) {
            data[Math.toIntExact(graphValueDto.getId()-1)]= graphValueDto.getData();
        }
    }
}
