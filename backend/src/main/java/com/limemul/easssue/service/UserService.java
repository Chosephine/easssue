package com.limemul.easssue.service;

import com.limemul.easssue.api.dto.user.UserInfoDto;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.jwt.JwtProvider;
import com.limemul.easssue.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jasypt.util.password.BasicPasswordEncryptor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
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
     * 회원가입
     * 비밀번호는 암호화해서 db 저장
     */
    @Transactional
    public User signUp(UserInfoDto userInfoDto) {
        BasicPasswordEncryptor basicEncryptor = new BasicPasswordEncryptor();
        String encryptPwd = basicEncryptor.encryptPassword(userInfoDto.getPwd());
        if (userRepo.findByEmail(userInfoDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 회원입니다.");
        }

        User user = User.of(userInfoDto.getEmail(), encryptPwd);
        return userRepo.save(user);
    }

    /**
     * 로그인 정보 확인
     * 잘못된 email 일 때 false 반환,
     * 잘못된 pwd 일 때 false 반환
     * */
    public boolean checkUser(UserInfoDto userInfoDto) {
        Optional<User> optionalUser = userRepo.findByEmail(userInfoDto.getEmail());
        if(optionalUser.isEmpty()){
            log.info("Unregistered user");
            return false;
        }
        User user = optionalUser.get();
        BasicPasswordEncryptor basicEncryptor = new BasicPasswordEncryptor();
        boolean checkPassword = basicEncryptor.checkPassword(userInfoDto.getPwd(), user.getPwd());
        if (!checkPassword){
            log.info("Incorrect password");
        }
        return checkPassword;
    }

    /**
     * 이메일 중복 체크
     */
    public User emailCheck(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
}
