package com.limemul.easssue.service;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import com.limemul.easssue.repo.KwdRepo;
import com.limemul.easssue.repo.RecKwdRepo;
import com.limemul.easssue.repo.UserKwdRepo;
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
     * 랜덤 키워드 한개 조회
     */
    public List<Kwd> getRandomKwd(){
        return kwdRepo.findByRandom();
    }

    /**
     * 구독 키워드 목록 갱신
     */
    @Transactional
    public void updateUserKwdList(List<Kwd> kwdList){

    }
}
