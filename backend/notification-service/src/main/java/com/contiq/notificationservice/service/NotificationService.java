package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDTO;

import java.util.List;

public interface NotificationService {
    List<NotificationDTO> getNotificationsByUserId(int userId);

    NotificationDTO addNotification(NotificationDTO notificationDTO) ;
    NotificationDTO markNotificationAsRead(int notificationId);
}
