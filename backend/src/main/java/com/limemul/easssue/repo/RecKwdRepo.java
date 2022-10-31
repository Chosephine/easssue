package com.limemul.easssue.repo;

import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RecKwdRepo extends JpaRepository<RecKwd,Long> {

    /**
     * 해당 사용자의 추천 키워드 리스트 반환
     *  인자 regDate 시점 이후 등록 키워드
     *  점수 내림차순 정렬
     */
    @EntityGraph(attributePaths = {"kwd"})
    List<RecKwd> findByUserAndRegDateAfterOrderByScoreDesc(User user, LocalDate regDate);
}
