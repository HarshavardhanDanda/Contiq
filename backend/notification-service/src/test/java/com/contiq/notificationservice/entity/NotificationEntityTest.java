package com.contiq.notificationservice.entity;

import org.joda.time.LocalDateTime;
import org.junit.jupiter.api.Test;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class NotificationEntityTest {

    @Test
     void testNoArgsConstructor() {
        Notification notification = new Notification();

        assertEquals(null, notification.getId());
        assertEquals(null, notification.getIsRead());
        assertEquals(null, notification.getUploadedBy());
        assertEquals(null, notification.getUserId());
        assertEquals(null, notification.getFileId());
        assertEquals(null, notification.getCreatedAt());
        assertEquals(null, notification.getUpdatedAt());
    }

    @Test
     void testAllArgsConstructor() {
       ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        Notification notification = new Notification(1, true, 123, currentTime, currentTime, 456, 789);

        assertEquals(1, notification.getId());
        assertEquals(true, notification.getIsRead());
        assertEquals(123, notification.getUploadedBy());
        assertEquals(456, notification.getUserId());
        assertEquals(789, notification.getFileId());
        assertEquals(currentTime, notification.getCreatedAt());
        assertEquals(currentTime, notification.getUpdatedAt());
    }
}
