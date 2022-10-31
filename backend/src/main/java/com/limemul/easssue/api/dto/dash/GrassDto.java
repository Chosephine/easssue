package com.limemul.easssue.api.dto.dash;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GrassDto {

    private LocalDate startDate;
    private LocalDate endDate;
    private List<GrassValueDto> values;
}
