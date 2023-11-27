package com.contiq.fileservice.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class FileEntityTest {

    private FileEntity fileEntity;

    @BeforeEach
    void setUp() {
        fileEntity = new FileEntity();
    }

    @Test
    void testId() {
        fileEntity.setId(1);
        assertEquals(1, fileEntity.getId());
    }

    @Test
    void testName() {
        fileEntity.setName("example.pdf");
        assertEquals("example.pdf", fileEntity.getName());
    }

    @Test
    void testType() {
        fileEntity.setType(FileType.pdf);
        assertEquals(FileType.pdf, fileEntity.getType());
    }

    @Test
    void testContent() {
        byte[] content = "Sample content".getBytes();
        fileEntity.setContent(content);
        assertEquals(content, fileEntity.getContent());
    }

    @Test
    void testUploadedBy() {
        fileEntity.setUploadedBy(42);
        assertEquals(42, fileEntity.getUploadedBy());
    }

    @Test
    void testCreatedAt() {
        ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        fileEntity.setCreatedAt(createdAt);
        assertEquals(createdAt, fileEntity.getCreatedAt());
    }

    @Test
    void testUpdatedAt() {
        ZonedDateTime updatedAt = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        fileEntity.setUpdatedAt(updatedAt);
        assertEquals(updatedAt, fileEntity.getUpdatedAt());
    }

    @Test
    void testAllArgsConstructor() {
        ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        fileEntity = new FileEntity(1, "example.pdf", FileType.pdf, "Sample content".getBytes(), 42, createdAt, createdAt);
        assertNotNull(fileEntity);
        assertEquals(1, fileEntity.getId());
        assertEquals("example.pdf", fileEntity.getName());
        assertEquals(FileType.pdf, fileEntity.getType());
        assertEquals("Sample content", new String(fileEntity.getContent()));
        assertEquals(42, fileEntity.getUploadedBy());
        assertNotNull(fileEntity.getCreatedAt());
        assertNotNull(fileEntity.getUpdatedAt());
    }
}
