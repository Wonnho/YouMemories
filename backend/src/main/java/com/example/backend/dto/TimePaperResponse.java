package com.example.backend.dto;

import com.example.backend.model.TimePaper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimePaperResponse {

    private Long timePaperId;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TimePaperResponse from(TimePaper timePaper) {
        TimePaperResponse response = new TimePaperResponse();
        response.setTimePaperId(timePaper.getId());
        response.setTitle(timePaper.getTitle());
        response.setCreatedAt(timePaper.getCreatedAt());
        response.setUpdatedAt(timePaper.getUpdatedAt());
        return response;
    }
}
