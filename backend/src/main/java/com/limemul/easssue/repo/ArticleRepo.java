package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepo extends JpaRepository<Article, Long> {

}
