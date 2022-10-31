package com.limemul.easssue.service;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
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
    public List<UserKwd> getUserKwdList(User user){
        return userKwdRepo.findByUserOrderById(user);
    }

    /**
     *
     */
    @Transactional
    public void updateUserKwdList(User user,List<Long> updatedUserKwdIds){
        //사용자의 구독 키워드 전체 삭제
        //todo 이걸 지우는게 맞나..
        userKwdRepo.deleteByUser(user);

        //업데이트된 키워드
        List<Kwd> kwdList = kwdRepo.findAllById(updatedUserKwdIds);

        //사용자 구독 키워드 추가
        List<UserKwd> updatedUserKwdList=new ArrayList<>();
        for (Kwd kwd : kwdList) {
            updatedUserKwdList.add(UserKwd.of(user,kwd));
        }
        userKwdRepo.saveAll(updatedUserKwdList);
    }
}
