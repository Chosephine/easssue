package com.limemul.easssue.api.dto.user;

import com.lemonmul.gamulgamul.entity.user.Gender;
import com.lemonmul.gamulgamul.entity.user.Role;
import com.lemonmul.gamulgamul.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    private String email;

    private String pwd;

    private String name;

    private Gender gender;

    private LocalDate birthday;

    private Role role;

    public User toUser() {
        // TODO: @Bean으로 등록된 걸 가져오고 싶은데 방법을 모르겠음
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        pwd = bCryptPasswordEncoder.encode(pwd);

        return User.of(email, pwd, name, gender, birthday, role);
    }
}
