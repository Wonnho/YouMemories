package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.TimePaperCreateRequest;
import com.example.backend.dto.TimePaperResponse;
import com.example.backend.service.TimePaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/timepaper")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TimePaperController {

    private final TimePaperService timePaperService;

    @PostMapping
    public ResponseEntity<ApiResponse<TimePaperResponse>> createTimePaper(
            @Valid @RequestBody TimePaperCreateRequest request) {
        try {
            String email = getCurrentUserEmail();
            TimePaperResponse response = timePaperService.createTimePaper(email, request);
            return ResponseEntity.ok(ApiResponse.success("타임페이퍼가 생성되었습니다.", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/my-timepapers")
    public ResponseEntity<ApiResponse<List<TimePaperResponse>>> getMyTimePapers() {
        try {
            String email = getCurrentUserEmail();
            List<TimePaperResponse> timePapers = timePaperService.getUserTimePapers(email);
            return ResponseEntity.ok(ApiResponse.success("타임페이퍼 목록을 조회했습니다.", timePapers));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TimePaperResponse>> getTimePaper(@PathVariable Long id) {
        try {
            TimePaperResponse response = timePaperService.getTimePaperById(id);
            return ResponseEntity.ok(ApiResponse.success("타임페이퍼를 조회했습니다.", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("인증되지 않은 사용자입니다.");
        }
        return authentication.getName();
    }
}
