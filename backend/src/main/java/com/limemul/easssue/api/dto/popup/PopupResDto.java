package com.limemul.easssue.api.dto.popup;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class PopupResDto {

    private boolean error=true;
    private String cloud="";
    private List<String> summary=new ArrayList<>();

    public PopupResDto(String cloud, List<String> summary) {
        this.error=false;
        this.cloud = cloud;
        this.summary = summary;
    }
}
