package com.contiq.fileservice.service;

import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.helper.FileReaderService;
import com.contiq.fileservice.model.FileDocument;
import com.contiq.fileservice.repository.FileSearchRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ElasticSearchServiceTest {

    @InjectMocks
    private ElasticSearchService elasticSearchService;

    @Mock
    private FileReaderService fileReaderService;

    @Mock
    private FileSearchRepository fileSearchRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testIndexFileWhenNotExisting() throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(1);
        fileEntity.setName("Test File");
        fileEntity.setContent(new byte[0]); // Empty content for simplicity
        fileEntity.setUploadedBy(123);

        String fileContent = "parsed content";
        when(fileReaderService.parsePdfContent(any())).thenReturn(fileContent);
        when(fileSearchRepository.findById(fileEntity.getId())).thenReturn(Optional.empty());

        elasticSearchService.indexFile(fileEntity);

        verify(fileSearchRepository, times(1)).save(any(FileDocument.class));
    }

    @Test
    void testIndexFileWhenExisting() throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(1);
        fileEntity.setName("Test File");
        fileEntity.setContent(new byte[0]); // Empty content for simplicity
        fileEntity.setUploadedBy(123);

        FileDocument fileDocument = new FileDocument();

        String fileContent = "parsed content";
        when(fileReaderService.parsePdfContent(any())).thenReturn(fileContent);
        when(fileSearchRepository.findById(fileEntity.getId())).thenReturn(Optional.of(fileDocument));

        elasticSearchService.indexFile(fileEntity);

        verify(fileSearchRepository, times(1)).save(fileDocument);
    }

    @Test
    void testSearchByKeyword() {
        String keyword = "test";
        List<FileDocument> mockedList = Collections.singletonList(new FileDocument());

        when(fileSearchRepository.findAllByNameOrContent(keyword, keyword)).thenReturn(mockedList);

        List<FileDocument> result = elasticSearchService.searchByKeyword(keyword);

        assertEquals(mockedList, result);
    }

    @Test
    void whenIndexFileIOException_thenNothingSaved() throws IOException {
        // Arrange
        ZonedDateTime createdAt = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        byte[] fileContentBytes = new byte[]{1, 2, 3, 4};
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(1);
        fileEntity.setName("Test File");
        fileEntity.setContent(fileContentBytes);
        fileEntity.setUploadedBy(123);
        fileEntity.setCreatedAt(createdAt);
        fileEntity.setUpdatedAt(createdAt);

        when(fileReaderService.parsePdfContent(fileContentBytes)).thenThrow(IOException.class);

        elasticSearchService.indexFile(fileEntity);
        verify(fileSearchRepository, never()).save(any(FileDocument.class));
    }
}
