package com.example.backend.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimePaperCreateRequest {

    @NotBlank(message = "제목은 필수입니다")
    @Size(max = 30, message = "제목의 최대 글자 수는 30자 입니다")
    private String title;
}
