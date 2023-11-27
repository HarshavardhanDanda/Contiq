package com.contiq.fileservice.controller;

import com.contiq.fileservice.dto.FileDTO;

import com.contiq.fileservice.dto.FileSearchResult;
import com.contiq.fileservice.dto.FileWithoutContent;
import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.entity.FileType;
import com.contiq.fileservice.repository.FileEntityRepository;
import com.contiq.fileservice.service.FileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

import static org.mockito.Mockito.when;

class FileControllerTest {

    @InjectMocks
    private FileController fileController;

    @Mock
    private FileEntityRepository fileEntityRepository;

    @Mock
    private FileService fileService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllFiles() {
        List<FileWithoutContent> files = new ArrayList<>();
        when(fileService.getAllFiles()).thenReturn(files);

        ResponseEntity<List<FileWithoutContent>> response = fileController.getAllFiles();

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(files, response.getBody());
    }

    @Test
    void testGetAllFiles_2() {
        List<FileWithoutContent> files = new ArrayList<>();
        when(fileService.getAllFiles()).thenReturn(files);

        ResponseEntity<List<FileWithoutContent>> response = fileController.getAllFiles();

        assertNotNull(response);
        assertEquals(files, response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getFileByFileID_Success() {
        byte[] mockContent = "Mock content".getBytes();
        FileDTO mockFile = new FileDTO();
        mockFile.setContent(mockContent);
        when(fileService.getFileByFileID(anyInt())).thenReturn(Optional.of(mockFile));
        ResponseEntity<?> responseEntity = fileController.getFileByFileID(1, null);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertTrue(responseEntity.getHeaders().containsKey("Content-Type"));
        assertArrayEquals(mockContent, (byte[]) responseEntity.getBody());
    }

    @Test
    void getFileByFileID_NotFound() {
        when(fileService.getFileByFileID(anyInt())).thenReturn(Optional.empty());
        ResponseEntity<?> responseEntity = fileController.getFileByFileID(1, null);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
    void getFileByFileID_ContentNotNull() throws IOException {
        byte[] mockContent = "Mock content".getBytes();
        FileDTO mockFileDTO = new FileDTO();
        mockFileDTO.setContent(mockContent);

        when(fileService.getFileByFileID(anyInt())).thenReturn(Optional.of(mockFileDTO));

        ResponseEntity<?> responseEntity = fileController.getFileByFileID(1, null);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getHeaders().getContentType());
        assertArrayEquals(mockContent, (byte[]) responseEntity.getBody());
    }

    @Test
    void getFileByFileID_ContentNull() throws IOException {
        when(fileService.getFileByFileID(anyInt())).thenReturn(Optional.of(new FileDTO()));

        ResponseEntity<byte[]> responseEntity = fileController.getFileByFileID(1, null);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("File not found", new String(responseEntity.getBody()));
    }

    @Test
    void testSaveFile_Success() throws IOException, SQLException {
        MultipartFile file = Mockito.mock(MultipartFile.class);
        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;

        FileEntity savedFile = new FileEntity();
        savedFile.setId(1);

        when(fileService.saveFile(file, name, type, uploadedBy)).thenReturn(savedFile);

        ResponseEntity<String> response = fileController.saveFile(file, name, type, "1");

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("File uploaded successfully with ID: 1", response.getBody());
    }

    @Test
    void testSaveFile_Exception() throws IOException, SQLException {
        MultipartFile file = Mockito.mock(MultipartFile.class);
        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;

        when(fileService.saveFile(file, name, type, uploadedBy)).thenThrow(IOException.class);

        ResponseEntity<String> response = fileController.saveFile(file, name, type, "1");

        assertNotNull(response);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to upload file", response.getBody());
    }

    @Test
    void testGetAllFilesByUserId() {
        Integer userId = 1;
        List<FileWithoutContent> files = new ArrayList<>();
        when(fileService.getAllFilesByUserId(userId)).thenReturn(files);

        ResponseEntity<List<FileWithoutContent>> response = fileController.getAllFilesByUserId(userId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(files, response.getBody());
    }

    @Test
    void testSearchFilesByKeyword_Success() {
        String keyword = "test";
        List<FileSearchResult> searchResults = new ArrayList<>();
        searchResults.add(new FileSearchResult(1, "Test Document"));

        when(fileService.searchFilesByKeyword(keyword)).thenReturn(searchResults);

        ResponseEntity<Object> response = fileController.searchFilesByKeyword(keyword);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(searchResults, response.getBody());
    }

    @Test
    void testSearchFilesByKeyword_EmptyResult() {

        String keyword = "test";
        when(fileService.searchFilesByKeyword(keyword)).thenReturn(new ArrayList<>());

        ResponseEntity<Object> response = fileController.searchFilesByKeyword(keyword);
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertTrue(response.getBody() instanceof List);
        assertTrue(((List<?>) response.getBody()).isEmpty());
    }

    @Test
    void searchFilesByKeyword_Error() {
        when(fileService.searchFilesByKeyword(anyString())).thenThrow(new RuntimeException("Test error"));
        ResponseEntity<Object> responseEntity = fileController.searchFilesByKeyword("test");
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("Test error", responseEntity.getBody());
    }
}

