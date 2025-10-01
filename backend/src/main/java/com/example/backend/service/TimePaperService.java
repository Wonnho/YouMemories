package com.example.backend.service;

import com.example.backend.dto.TimePaperCreateRequest;
import com.example.backend.dto.TimePaperResponse;
import com.example.backend.model.TimePaper;
import com.example.backend.model.User;
import com.example.backend.repository.TimePaperRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimePaperService {

    private final TimePaperRepository timePaperRepository;
    private final UserRepository userRepository;

    @Transactional
    public TimePaperResponse createTimePaper(String email, TimePaperCreateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new RuntimeException("제목은 필수입니다.");
        }

        if (request.getTitle().trim().length() == 0) {
            throw new RuntimeException("공백만으로 이루어진 제목은 사용할 수 없습니다.");
        }

        if (request.getTitle().length() > 30) {
            throw new RuntimeException("제목의 최대 글자 수는 30자 입니다.");
        }

        TimePaper timePaper = new TimePaper();
        timePaper.setUser(user);
        timePaper.setTitle(request.getTitle().trim());

        TimePaper savedTimePaper = timePaperRepository.save(timePaper);

        return TimePaperResponse.from(savedTimePaper);
    }

    @Transactional(readOnly = true)
    public List<TimePaperResponse> getUserTimePapers(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        List<TimePaper> timePapers = timePaperRepository.findByUserOrderByCreatedAtDesc(user);

        return timePapers.stream()
                .map(TimePaperResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TimePaperResponse getTimePaperById(Long id) {
        TimePaper timePaper = timePaperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("타임페이퍼를 찾을 수 없습니다."));

        return TimePaperResponse.from(timePaper);
    }
}
