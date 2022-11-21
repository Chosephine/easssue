package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.RelKwd;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RelKwdRepo extends JpaRepository<RelKwd, Long> {

    /**
     * 해당 키워드에 대한 연관 키워드 반환 (중복 없이)
     */
    @Query("select distinct rk.toKwd,rk.regDate from RelKwd rk where rk.fromKwd=:fromKwd")
    List<Kwd> findDistinctByFromKwd(@Param("fromKwd") Kwd fromKwd, Pageable pageable);
}
