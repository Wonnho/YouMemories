package com.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Value("${spring.mail.from:noreply@youmemories.com}")
    private String fromEmail;

    public void sendEmailVerification(String toEmail, String verificationToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("YouMemories 이메일 인증");

            String verificationUrl = frontendUrl + "/verify-email?token=" + verificationToken;
            String emailContent = String.format(
                "YouMemories 회원가입을 완료하려면 아래 링크를 클릭해주세요:\n\n" +
                "%s\n\n" +
                "이 링크는 24시간 후에 만료됩니다.\n\n" +
                "감사합니다.\n" +
                "YouMemories 팀",
                verificationUrl
            );

            message.setText(emailContent);

            javaMailSender.send(message);
            log.info("이메일 인증 메일이 전송되었습니다: {}", toEmail);

        } catch (Exception e) {
            log.error("이메일 전송 실패: {}", e.getMessage());
            throw new RuntimeException("이메일 전송에 실패했습니다.");
        }
    }
}