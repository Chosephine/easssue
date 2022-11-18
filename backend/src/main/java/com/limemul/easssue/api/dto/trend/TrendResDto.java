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
        this.trend = trendList.stream().map(Trend::getTitle).toList();
    }
}
