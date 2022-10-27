package com.limemul.easssue.service;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.repo.KwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KwdService {

    private final KwdRepo kwdRepo;

    /**
     * 사용자 키워드 목록 갱신
     */
    @Transactional
    public void updateUserKwdList(List<Kwd> kwdList){

    }
}
