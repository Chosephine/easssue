package com.limemul.easssue.repo;

import com.limemul.easssue.entity.ArticleLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleLogRepo extends JpaRepository<ArticleLog,Long> {
}
