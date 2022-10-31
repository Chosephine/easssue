package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Kwd;
import com.limemul.easssue.entity.RelKwd;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RelKwdRepo extends JpaRepository<RelKwd, Long> {

    List<RelKwd> findAllByFromKwd(Optional<Kwd> fromKwd);

}
