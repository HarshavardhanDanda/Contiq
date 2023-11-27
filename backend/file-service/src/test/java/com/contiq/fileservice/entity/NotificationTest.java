package com.contiq.fileservice.entity;

import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class NotificationTest {

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

    @Test
    void testSetters() {
        Notification notification = new Notification();
        ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        notification.setId(1);
        notification.setIsRead(true);
        notification.setUploadedBy(123);
        notification.setCreatedAt(currentTime);
        notification.setUpdatedAt(currentTime);
        notification.setUserId(456);
        notification.setFileId(789);

        assertEquals(1, notification.getId());
        assertEquals(true, notification.getIsRead());
        assertEquals(123, notification.getUploadedBy());
        assertNotNull(notification.getCreatedAt());
        assertNotNull(notification.getUpdatedAt());
        assertEquals(456, notification.getUserId());
        assertEquals(789, notification.getFileId());
    }
}

