package com.example.backend.repository;

import com.example.backend.model.TimePaper;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimePaperRepository extends JpaRepository<TimePaper, Long> {

    List<TimePaper> findByUserOrderByCreatedAtDesc(User user);

    List<TimePaper> findByUser_IdOrderByCreatedAtDesc(Long userId);
}
