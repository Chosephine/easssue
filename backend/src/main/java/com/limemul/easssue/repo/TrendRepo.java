package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Trend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrendRepo extends JpaRepository<Trend,Long> {

    /**
     * 최근 등록한 실시간 검색어 10개 반환
     */
    List<Trend> findTop10ByOrderByIdDesc();
}
