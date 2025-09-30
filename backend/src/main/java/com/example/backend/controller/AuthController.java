package com.example.backend.controller;

import com.example.backend.dto.SignUpRequest;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.ApiResponse;
import com.example.backend.service.AuthService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            authService.signUp(signUpRequest);
            return ResponseEntity.ok(ApiResponse.success("회원가입이 완료되었습니다. 이메일 인증을 완료해주세요."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest);
            return ResponseEntity.ok(ApiResponse.success("로그인 성공", token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            return ResponseEntity.ok(ApiResponse.success("이메일 인증이 완료되었습니다."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Void>> checkEmailAvailability(@RequestParam String email) {
        boolean isAvailable = authService.isEmailAvailable(email);
        String message = isAvailable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다.";
        if (isAvailable) {
            return ResponseEntity.ok(ApiResponse.success(message));
        } else {
            return ResponseEntity.ok(ApiResponse.error(message));
        }
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<ApiResponse<Void>> checkNicknameAvailability(@RequestParam String nickname) {
        boolean isAvailable = authService.isNicknameAvailable(nickname);
        String message = isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.";
        if (isAvailable) {
            return ResponseEntity.ok(ApiResponse.success(message));
        } else {
            return ResponseEntity.ok(ApiResponse.error(message));
        }
    }

    @GetMapping("/kakao")
    public void kakaoLogin(HttpServletResponse response) throws IOException {
        String kakaoAuthUrl = authService.getKakaoAuthUrl();
        response.sendRedirect(kakaoAuthUrl);
    }

    @GetMapping("/kakao/callback")
    public ResponseEntity<ApiResponse<String>> kakaoCallback(@RequestParam String code) {
        try {
            String token = authService.processKakaoCallback(code);
            return ResponseEntity.ok(ApiResponse.success("카카오 로그인 성공", token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}