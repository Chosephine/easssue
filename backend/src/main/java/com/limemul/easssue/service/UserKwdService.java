package com.limemul.easssue.service;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import com.limemul.easssue.entity.UserKwdType;
import com.limemul.easssue.repo.KwdRepo;
import com.limemul.easssue.repo.UserKwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserKwdService {

    private final UserKwdRepo userKwdRepo;
    private final KwdRepo kwdRepo;

    /**
     * 해당 사용자의 구독 키워드 조회
     */
    public List<UserKwd> getSubscKwdList(User user){
        return userKwdRepo.findByUserAndTypeOrderById(user,UserKwdType.s);
    }

    /**
     * 해당 사용자의 금지 키워드 조회
     */
    public List<UserKwd> getBanKwdList(User user){
        return userKwdRepo.findByUserAndTypeOrderById(user,UserKwdType.b);
    }

    /**
     * 구독 키워드 업데이트
     *  해당 사용자의 현재 구독 키워드 전체 삭제 후,
     *  업데이트할 키워드 리스트 저장
     */
    @Transactional
    public void updateSubscKwdList(User user, List<Long> updatedKwdIds){
        updateKwdList(user, updatedKwdIds, UserKwdType.s);
    }

    /**
     * 금지 키워드 업데이트
     *  해당 사용자의 현재 금지 키워드 전체 삭제 후,
     *  업데이트할 키워드 리스트 저장
     */
    @Transactional
    public void updateBanKwdList(User user, List<Long> updatedKwdIds){
        updateKwdList(user, updatedKwdIds, UserKwdType.b);
    }

    //========================================================================

    public void updateKwdList(User user, List<Long> updatedKwdIds, UserKwdType type) {
        //사용자의 구독 또는 금지 키워드 전체 삭제
        userKwdRepo.deleteByUserAndType(user,type);

        //업데이트된 키워드
        List<Kwd> kwdList = kwdRepo.findAllById(updatedKwdIds);

        //사용자의 구독 또는 금지 키워드 추가
        List<UserKwd> updatedKwdList=new ArrayList<>();
        for (Kwd kwd : kwdList) {
            updatedKwdList.add(UserKwd.of(user,kwd,type));
        }
        userKwdRepo.saveAll(updatedKwdList);
    }
}
