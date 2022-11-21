package com.limemul.easssue.repo;

import com.limemul.easssue.entity.User;
import com.limemul.easssue.entity.UserKwd;
import com.limemul.easssue.entity.UserKwdType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserKwdRepo extends JpaRepository<UserKwd,Long> {

    /**
     * 해당 사용자의 구독 키워드 리스트 반환
     */
    @EntityGraph(attributePaths = {"kwd"})
    List<UserKwd> findByUserAndTypeOrderById(User user,UserKwdType type);

    /**
     * 해당 사용자의 구독 키워드 리스트 전체 삭제
     */
    @Modifying
    @Query("delete from UserKwd where user=:user and type=:type")
    void deleteByUserAndType(@Param("user") User user, @Param("type") UserKwdType type);
}
