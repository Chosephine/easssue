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
     * 기본키로 사용자 조회
     */
    public User getUserById(Long id){
        return userRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }

    /**
     * google profile에서 email 찾아서 반환
     *  이메일로 회원가입 여부 판단
     *  비회원이면 강제 회원가입
     */
    @Transactional
    public String getEmail(UserInfoDto userInfoDto){
        String email= userInfoDto.getEmail();

//        if(!userInfoDto.isVerifiedEmail()){
//            log.info("{} is not verified email.",email);
//        }

        Optional<User> optionalUser = userRepo.findByEmail(email);
        if(optionalUser.isEmpty()){
            //회원가입
            User user = userRepo.save(User.from(userInfoDto));
            log.info("userId: {} (email: {}) signed up.",user.getId(),email);
        }
        return email;
    }

    /**
     * 회원가입
     * 비밀번호는 암호화해서 db 저장
     */
    @Transactional
    public User signUp(UserInfoDto userInfoDto) {
        BasicPasswordEncryptor basicEncryptor = new BasicPasswordEncryptor();
        String encryptPwd = basicEncryptor.encryptPassword(userInfoDto.getPwd());
        User user = new User(userInfoDto.getEmail(), encryptPwd);
        return userRepo.save(user);
    }

    /**
     * 로그인 정보 확인
     * 잘못된 email일 때 오류 반환,
     * 잘못된 pwd일 때 오류 반환
     * */
    public boolean checkUser(UserInfoDto userInfoDto) {
        User user = getUserByEmail(userInfoDto.getEmail());
        BasicPasswordEncryptor basicEncryptor = new BasicPasswordEncryptor();
        boolean checkPwd = basicEncryptor.checkPassword(userInfoDto.getPwd(), user.getPwd());
        if (!checkPwd){
            throw new IllegalArgumentException("패스워드가 틀렸습니다.");
        }
        return true;

    }

    /**
     * 이메일 중복 체크
     */
    public User emailCheck(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
}
