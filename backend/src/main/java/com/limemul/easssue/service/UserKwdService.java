package com.limemul.easssue.service;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import com.limemul.easssue.repo.UserKwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserKwdService {

    private final UserKwdRepo userKwdRepo;

    /**
     * 사용자 키워드 조회
     */
    public List<UserKwd> getUserKwdList(User user){
        return userKwdRepo.findByUserOrderById(user);
    }
}
