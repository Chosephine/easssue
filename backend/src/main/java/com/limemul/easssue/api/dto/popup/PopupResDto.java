package com.limemul.easssue.api.dto.popup;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PopupResDto {

    private boolean error=true;
    private String cloud="";
    private String summary="";

    public PopupResDto(String cloud, String summary) {
        this.error=false;
        this.cloud = cloud;
        this.summary = summary;
    }
}
