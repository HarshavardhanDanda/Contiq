package com.contiq.fileservice.model;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class FileDocumentTest {

    @Test
    void whenConstructedWithAllArgsConstructor_thenCorrect() {
        LocalDate currentDate = LocalDate.now();
        FileDocument fileDocument = new FileDocument(1, "Sample Name", "Sample Type", "Sample Content", 123, currentDate, currentDate);

        assertEquals(1, fileDocument.getId());
        assertEquals("Sample Name", fileDocument.getName());
        assertEquals("Sample Type", fileDocument.getType());
        assertEquals("Sample Content", fileDocument.getContent());
        assertEquals(123, fileDocument.getUploadedBy());
        assertEquals(currentDate, fileDocument.getCreatedAt());
        assertEquals(currentDate, fileDocument.getUpdatedAt());
    }
}