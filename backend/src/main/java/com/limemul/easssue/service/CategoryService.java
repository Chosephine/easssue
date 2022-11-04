package com.limemul.easssue.service;

import com.limemul.easssue.entity.Category;
import com.limemul.easssue.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepo categoryRepo;

    /**
     * 전체 카테고리 정보 조회
     */
    public List<Category> getAllCategories(){
        return categoryRepo.findAllByOrderById();
    }
}
