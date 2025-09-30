package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignUpRequest;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.email-verification.expiration-hours:24}")
    private int emailVerificationExpirationHours;

    private static final Pattern PASSWORD_PATTERN =
        Pattern.compile("^(?=.*[!@#$%^&*(),.?\":{}|<>]).*$");

    @Transactional
    public void signUp(SignUpRequest request) {
        validateSignUpRequest(request);

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 사용 중인 이메일입니다.");
        }

        if (userRepository.existsByNickname(request.getNickname())) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname());
        user.setProvider(User.AuthProvider.LOCAL);
        user.setIsEmailVerified(true); // 임시로 이메일 인증 완료 상태로 설정
        user.setIsActive(true);

        // 이메일 인증 토큰 설정 (필요시 나중에 활성화)
        // String verificationToken = UUID.randomUUID().toString();
        // user.setEmailVerificationToken(verificationToken);
        // user.setEmailVerificationTokenExpiresAt(
        //     LocalDateTime.now().plusHours(emailVerificationExpirationHours)
        // );

        userRepository.save(user);

        // 이메일 전송 임시 비활성화 (SMTP 설정 후 활성화)
        // emailService.sendEmailVerification(user.getEmail(), verificationToken);
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmailAndIsEmailVerifiedTrueAndIsActiveTrue(request.getEmail())
            .orElseThrow(() -> new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // TODO: JWT 토큰 생성 및 반환
        return "temporary-token-" + user.getId();
    }

    @Transactional
    public void verifyEmail(String token) {
        User user = userRepository.findByEmailVerificationToken(token)
            .orElseThrow(() -> new RuntimeException("유효하지 않은 인증 토큰입니다."));

        if (user.getEmailVerificationTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("인증 토큰이 만료되었습니다.");
        }

        user.setIsEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationTokenExpiresAt(null);

        userRepository.save(user);
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    public String getKakaoAuthUrl() {
        // 실제 구현시에는 application.properties에서 설정값을 가져와야 합니다
        String clientId = "YOUR_KAKAO_CLIENT_ID";
        String redirectUri = "http://localhost:8080/api/auth/kakao/callback";

        return String.format(
            "https://kauth.kakao.com/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code",
            clientId, redirectUri
        );
    }

    public String processKakaoCallback(String code) {
        // TODO: 실제 카카오 API 호출 구현
        // 1. code로 access_token 받기
        // 2. access_token으로 사용자 정보 받기
        // 3. 사용자 정보로 회원가입 또는 로그인 처리

        // 임시 구현
        throw new RuntimeException("카카오 로그인은 현재 구현 중입니다.");
    }

    private void validateSignUpRequest(SignUpRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        if (request.getPassword().length() < 8) {
            throw new RuntimeException("비밀번호는 8글자 이상이어야 합니다.");
        }

        if (!PASSWORD_PATTERN.matcher(request.getPassword()).find()) {
            throw new RuntimeException("비밀번호는 특수문자를 최소 1개 포함해야 합니다.");
        }

        if (!request.isAcceptTerms()) {
            throw new RuntimeException("이용약관에 동의해주세요.");
        }

        if (!request.isAcceptPrivacy()) {
            throw new RuntimeException("개인정보 처리방침에 동의해주세요.");
        }
    }
}