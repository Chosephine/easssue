package com.limemul.easssue.api.dto.trend;

import com.limemul.easssue.entity.Trend;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class TrendResDto {

    List<String> trend;

    public TrendResDto(List<Trend> trendList) {
        List<String> strings = trendList.stream().map(Trend::getTitle).toList();
        for (String string : strings) {
            String[] split = string.trim().split("\\s*;\\s*");
            trend.add(split[1]);
        }
    }
}
