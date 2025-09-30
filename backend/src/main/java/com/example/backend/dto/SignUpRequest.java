package com.example.backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식을 입력해주세요")
    @Size(max = 150, message = "이메일은 150자를 초과할 수 없습니다")
    private String email;

    @NotBlank(message = "비밀번호는 필수입니다")
    @Size(min = 8, message = "비밀번호는 8글자 이상이어야 합니다")
    @Pattern(regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).*$", message = "비밀번호는 특수문자를 최소 1개 포함해야 합니다")
    private String password;

    @NotBlank(message = "비밀번호 확인은 필수입니다")
    private String confirmPassword;

    @NotBlank(message = "닉네임은 필수입니다")
    @Size(min = 2, max = 20, message = "닉네임은 2자 이상 20자 이하여야 합니다")
    private String nickname;

    private boolean acceptTerms;
    private boolean acceptPrivacy;
}