package com.limemul.easssue.service;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.repo.KwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KwdService {

    private final KwdRepo kwdRepo;

    /**
     * 랜덤 키워드 하나 조회
     *  최근 일주일 기사에 있는 키워드 중에서
     */
    public List<Kwd> getRandomKwd(){
        return kwdRepo.findRandomOrderByArticleKwd();
    }

    /**
     * 검색한 키워드 리스트 조회
     */
    public List<Kwd> searchKwd(String searchStr){
        return kwdRepo.findByNameContains(searchStr);
    }
}
