package com.sunocean.repository;

import com.sunocean.entity.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findByCategoryIdOrderBySortOrderAsc(Long categoryId);
    List<Link> findByLinkTypeOrderBySortOrderAsc(String linkType);
    List<Link> findAllByOrderBySortOrderAsc();
}