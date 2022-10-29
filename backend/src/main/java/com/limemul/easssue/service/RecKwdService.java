package com.limemul.easssue.service;

import com.limemul.easssue.repo.RecKwdRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecKwdService {

    private final RecKwdRepo recKwdRepo;

    /**
     *
     */
}
