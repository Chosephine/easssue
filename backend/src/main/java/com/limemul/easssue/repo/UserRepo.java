package com.limemul.easssue.repo;

import com.limemul.easssue.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    /**
     * 이메일로 사용자 조회
     */
    Optional<User> findByEmail(String email);
}
