package com.limemul.easssue.service;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    /**
     * 이메일 중복 체크
     */
    public User emailCheck(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    /**
     * 회원가입
     */
    @Transactional
    public User signUp(User user) {
        return userRepo.save(user);
    }

    /**
     * email로 사용자 정보를 가져오는 함수
     */
    public User getUserInfoByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow();
    }
}
