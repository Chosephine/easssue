package com.limemul.easssue.repo;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserKwdRepo extends JpaRepository<UserKwd,Long> {

    //todo 한번에 잘 불러와지는지 확인해야함
    @EntityGraph(attributePaths = {"kwd"})
    List<UserKwd> findByUserOrderById(User user);
}
