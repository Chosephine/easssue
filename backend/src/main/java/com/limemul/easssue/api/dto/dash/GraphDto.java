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
    private List<Integer> data;
}
