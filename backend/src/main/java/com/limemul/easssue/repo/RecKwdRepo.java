package com.limemul.easssue.repo;

import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecKwdRepo extends JpaRepository<RecKwd,Long> {

    /**
     * 해당 사용자의 추천 키워드 리스트 반환
     *  등록일 내림차순 정렬
     */
    @Query(value = "(select * from kwd k " +
            "join rec_kwd rk on rk.kwd_id=k.kwd_id " +
            "order by rk.reg_date desc limit 10) " +
            "order by rand() limit 5",nativeQuery = true)
    List<RecKwd> findByUserOrderByRegDateDesc(User user);
}
