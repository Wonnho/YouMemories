package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.TimePaperCreateRequest;
import com.example.backend.dto.TimePaperResponse;
import com.example.backend.service.TimePaperService;
import com.example.backend.util.JwtUtil;
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
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<TimePaperResponse>> createTimePaper(
            @Valid @RequestBody TimePaperCreateRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            String email = extractEmailFromToken(authHeader);
            TimePaperResponse response = timePaperService.createTimePaper(email, request);
            return ResponseEntity.ok(ApiResponse.success("타임페이퍼가 생성되었습니다.", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/my-timepapers")
    public ResponseEntity<ApiResponse<List<TimePaperResponse>>> getMyTimePapers(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            String email = extractEmailFromToken(authHeader);
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

    /**
     * Authorization 헤더에서 JWT 토큰을 추출하고 이메일을 반환
     */
    private String extractEmailFromToken(String authHeader) {
        if (authHeader == null || authHeader.trim().isEmpty()) {
            throw new RuntimeException("로그인이 필요합니다.");
        }

        // "Bearer " 접두사 제거
        String token = authHeader;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        try {
            // JWT 토큰에서 이메일 추출
            String email = jwtUtil.extractEmail(token);

            // 토큰 유효성 검증
            if (!jwtUtil.validateToken(token, email)) {
                throw new RuntimeException("유효하지 않은 토큰입니다.");
            }

            return email;
        } catch (Exception e) {
            throw new RuntimeException("토큰 인증에 실패했습니다: " + e.getMessage());
        }
    }
}
