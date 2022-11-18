package com.limemul.easssue.repo;

import com.limemul.easssue.entity.Kwd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface KwdRepo extends JpaRepository<Kwd,Long> {

    /**
     * 랜덤 키워드 하나 반환
     *  해당 날짜 이후 기사에 포함된 키워드 중에서
     *  !!!느림!!!
     */
    @Query(value = "select k.* from article_kwd ak " +
            "join article a on ak.article_id=a.article_id " +
            "join kwd k on ak.kwd_id=k.kwd_id " +
            "where a.pub_date>=:pubDate order by rand() limit 1",nativeQuery = true)
    List<Kwd> findRandomByPubDate(@Param("pubDate") LocalDate pubDate);

    /**
     * 랜덤 키워드 하나 반환
     *  최근 10개 기사 키워드 중 하나 반환
     */
    @Query(value = "(select k.* from kwd k " +
            "join article_kwd ak on ak.kwd_id=k.kwd_id " +
            "order by ak.article_kwd_id desc limit 10) " +
            "order by rand() limit 1",nativeQuery = true)
    List<Kwd> findRandomOrderByArticleKwd();

    /**
     * 완전 랜덤 키워드 하나 반환
     */
    @Query(value = "select k.* from kwd k order by rand() limit 1",nativeQuery = true)
    List<Kwd> findRandom();

    /**
     * 검색한 단어 포함하는 키워드 리스트 반환
     */
    List<Kwd> findByNameContains(String searchStr);

    /**
     * 조회한 순서 그대로 전체 키워드 리스트 반환
     */
    @Query(value = "select * from kwd where kwd_id in :ids order by field(kwd_id, :ids)",nativeQuery = true)
    List<Kwd> findByIdIn(@Param("ids") List<Long> ids);
}
