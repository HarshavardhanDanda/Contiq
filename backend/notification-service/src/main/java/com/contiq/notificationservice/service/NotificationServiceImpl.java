package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDTO;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.repository.NotificationRepository;
import com.contiq.notificationservice.utils.Constants;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, ModelMapper modelMapper) {
        this.notificationRepository = notificationRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public NotificationDTO addNotification(NotificationDTO notificationDTO) {
        Notification notification = modelMapper.map(notificationDTO, Notification.class);
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        notification.setCreatedAt(currentDateTimeIST);
        notification.setUpdatedAt(currentDateTimeIST);

        Notification savedNotification = notificationRepository.save(notification);
        return modelMapper.map(savedNotification, NotificationDTO.class);
    }

    @Override
    public List<NotificationDTO> getNotificationsByUserId(int userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);

        return notifications.stream()
                .map(notification -> modelMapper.map(notification, NotificationDTO.class))
                .toList();
    }
    @Override
    public NotificationDTO markNotificationAsRead(int notificationId) {
        Optional<Notification> notificationOptional = notificationRepository.findById(notificationId);
        if (notificationOptional.isPresent()) {
            Notification notification = notificationOptional.get();
            notification.setIsRead(true);
            notificationRepository.save(notification);
            return modelMapper.map(notification, NotificationDTO.class);
        }
        else {
            log.error("Notification not found for given notification id {}", notificationId);
            throw new NotificationNotFoundException(Constants.NOTIFICATION_NOT_FOUND + notificationId);
        }
    }




}
