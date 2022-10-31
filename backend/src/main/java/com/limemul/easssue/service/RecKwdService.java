package com.limemul.easssue.service;

import com.limemul.easssue.entity.RecKwd;
import com.limemul.easssue.entity.User;
import com.limemul.easssue.repo.RecKwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecKwdService {

    private final RecKwdRepo recKwdRepo;

    /**
     * 해당 사용자의 추천 키워드 조회
     *  하루 이내에 등록된 키워드
     */
    public List<RecKwd> getRecKwdList(User user){
        return recKwdRepo.findByUserAndRegDateAfterOrderByScoreDesc(user, LocalDate.now().minusDays(1));
    }
}
