package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {

    private Integer id;
    private Boolean isRead;
    private Integer uploadedBy;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private Integer userId;
    private Integer fileId;
}
