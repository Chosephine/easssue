package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category,Long> {

    /**
     * 전체 카테고리 정보 조회
     */
    List<Category> findAllByOrderById();
}
