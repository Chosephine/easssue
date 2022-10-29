package com.limemul.easssue.service;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepo userRepo;

    /**
     * 이메일로 사용자 조회
     *  access token에서 email 꺼내서 조회
     */
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }

    /**
     * google profile에서 email 찾아서 반환
     *  이메일로 회원가입 여부 판단 (강제 회원가입)
     */
    @Transactional
    public String getEmail(HttpServletRequest request){
        //todo request에서 이메일 뽑기
        String email="";

        Optional<User> optionalUser = userRepo.findByEmail(email);
        if(optionalUser.isEmpty()){
            //회원가입
            User user = User.from(request);
            userRepo.save(user);
        }
        return email;
    }
}
