package com.limemul.easssue.repo;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserKwdRepo extends JpaRepository<UserKwd,Long> {

    /**
     * 해당 유저의 구독 키워드 리스트 반환
     */
    @EntityGraph(attributePaths = {"kwd"})
    List<UserKwd> findByUserOrderById(User user);
}
