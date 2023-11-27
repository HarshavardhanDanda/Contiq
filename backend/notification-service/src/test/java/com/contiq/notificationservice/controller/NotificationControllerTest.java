package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDTO;
import com.contiq.notificationservice.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

 class NotificationControllerTest {

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private NotificationController notificationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddNotification() {
        NotificationDTO testNotification = new NotificationDTO();
        when(notificationService.addNotification(any(NotificationDTO.class))).thenReturn(testNotification);

        ResponseEntity<NotificationDTO> response = notificationController.addNotification(testNotification);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(testNotification, response.getBody());
    }

    @Test
    void testGetNotificationsByUserId_NotEmpty() {
        int userId = 123;
        List<NotificationDTO> testNotifications = Collections.singletonList(new NotificationDTO());
        when(notificationService.getNotificationsByUserId(userId)).thenReturn(testNotifications);

        ResponseEntity<List<NotificationDTO>> response = notificationController.getNotificationsByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testNotifications, response.getBody());
    }

    @Test
    void testGetNotificationsByUserId_Empty() {
        int userId = 456;
        List<NotificationDTO> emptyNotifications = Collections.emptyList();
        when(notificationService.getNotificationsByUserId(userId)).thenReturn(emptyNotifications);

        ResponseEntity<List<NotificationDTO>> response = notificationController.getNotificationsByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testMarkNotificationAsRead_NotNull() {
        int notificationId = 1;
        NotificationDTO testMarkedNotification = new NotificationDTO();
        when(notificationService.markNotificationAsRead(notificationId)).thenReturn(testMarkedNotification);

        ResponseEntity<NotificationDTO> response = notificationController.markNotificationAsRead(notificationId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testMarkedNotification, response.getBody());
    }

    @Test
    void testMarkNotificationAsRead_Null() {
        int notificationId = 2;
        when(notificationService.markNotificationAsRead(notificationId)).thenReturn(null);

        ResponseEntity<NotificationDTO> response = notificationController.markNotificationAsRead(notificationId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
