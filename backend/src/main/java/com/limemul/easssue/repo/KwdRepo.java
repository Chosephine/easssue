package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Kwd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KwdRepo extends JpaRepository<Kwd,Long> {

    /**
     * 랜덤 키워드 하나 반환
     */
    @Query(value = "select * from kwd order by rand() limit 1",nativeQuery = true)
    List<Kwd> findByRandom();

    /**
     * 검색한 단어 포함하는 키워드 리스트 반환
     */
    List<Kwd> findByNameContains(String searchStr);

    /**
     * 조회한 순서 그대로 전체 키워드 리스트 반환
     */
    @Query(value = "select * from kwd where kwd_id in :ids order by field(kwd_id, :ids)",nativeQuery = true)
    List<Kwd> findByIdIn(@Param("ids") List<Long> ids);
}
