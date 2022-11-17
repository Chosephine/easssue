package com.limemul.easssue.service;

import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.repo.RecKwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecKwdService {

    private final RecKwdRepo recKwdRepo;

    /**
     * 해당 사용자의 추천 키워드 조회
     *  최근 등록된 키워드 중 점수 높은 5개 반환
     *  추천 키워드는 하루에 한 사용자 당 10개 씩 등록됨
     */
    public List<RecKwd> getRecKwdList(User user){
        return recKwdRepo.findByUserOrderByRegDateDesc(user);
    }
}
