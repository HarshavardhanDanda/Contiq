package com.contiq.fileservice.service;

import com.contiq.fileservice.dto.FileDTO;

import com.contiq.fileservice.dto.FileSearchResult;
import com.contiq.fileservice.dto.FileWithoutContent;
import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.entity.FileType;
import com.contiq.fileservice.entity.Notification;
import com.contiq.fileservice.entity.User;
import com.contiq.fileservice.exception.FileServiceException;

import com.contiq.fileservice.model.FileDocument;
import com.contiq.fileservice.repository.FileEntityRepository;
import com.contiq.fileservice.repository.NotificationRepository;
import com.contiq.fileservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class FileServiceTest {

    @InjectMocks
    private FileService fileService;

    @Mock
    private FileEntityRepository fileEntityRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private ElasticSearchService elasticSearchService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fileEntityRepository = Mockito.mock(FileEntityRepository.class);
        elasticSearchService = Mockito.mock(ElasticSearchService.class);
        notificationRepository = Mockito.mock(NotificationRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        fileService = new FileService(modelMapper, fileEntityRepository, elasticSearchService, notificationRepository, userRepository);
    }


    @Test
    void testGetAllFiles() {
        List<FileWithoutContent> files = new ArrayList<>();
        when(fileEntityRepository.findAllFilesWithoutContent()).thenReturn(files);

        List<FileWithoutContent> result = fileService.getAllFiles();

        assertSame(files, result);
    }

    @Test
    void testGetAllFilesByUserId() {
        Integer userId = 1;
        List<FileWithoutContent> files = new ArrayList<>();
        when(fileEntityRepository.findAllFilesByUserId(userId)).thenReturn(files);

        List<FileWithoutContent> result = fileService.getAllFilesByUserId(userId);

        assertSame(files, result);
    }

    @Test
    void testGetAllFilesByUserIdThrowsError() {
        Integer userId = 1;
        when(fileEntityRepository.findAllFilesByUserId(userId)).thenThrow(FileServiceException.class);

        assertThrows(FileServiceException.class, () -> {
            fileService.getAllFilesByUserId(userId);
        });
    }

    @Test
    void testGetAllFilesThrowsError() {
        when(fileEntityRepository.findAllFilesWithoutContent()).thenThrow(FileServiceException.class);

        assertThrows(FileServiceException.class, () -> {
            fileService.getAllFiles();
        });
    }

    @Test
    void testGetFileByFileID() {
        Integer fileId = 1;
        FileEntity fileEntity = new FileEntity();
        when(fileEntityRepository.findById(fileId)).thenReturn(Optional.of(fileEntity));

        FileDTO fileDTO = new FileDTO();
        when(modelMapper.map(fileEntity, FileDTO.class)).thenReturn(fileDTO);

        Optional<FileDTO> result = fileService.getFileByFileID(fileId);

        assertTrue(result.isPresent());
        assertSame(fileDTO, result.get());
    }

    @Test
    void testGetFileByFileIDThrowsError() {
        Integer fileId = 1;
        when(fileEntityRepository.findById(fileId)).thenThrow(FileServiceException.class);

        assertThrows(FileServiceException.class, () -> {
            fileService.getFileByFileID(fileId);
        });
    }

    @Test
    void testGetFileByFileID_NotFound() {
        Integer fileId = 1;
        when(fileEntityRepository.findById(fileId)).thenReturn(Optional.empty());

        Optional<FileDTO> result = fileService.getFileByFileID(fileId);

        assertFalse(result.isPresent());
    }

    @Test
    void testSaveFile_NewFile() throws IOException, SQLException {
        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;

        MultipartFile file = Mockito.mock(MultipartFile.class);

        InputStream inputStream = new ByteArrayInputStream("Sample content".getBytes());
        when(file.getInputStream()).thenReturn(inputStream);

        when(file.getName()).thenReturn("file.pdf");

        when(fileEntityRepository.findByName(name)).thenReturn(null);

        FileEntity savedFile = new FileEntity();
        savedFile.setName(name);
        savedFile.setType(type);
        savedFile.setUploadedBy(uploadedBy);

        when(fileEntityRepository.save(any(FileEntity.class))).thenReturn(savedFile);

        FileEntity result = fileService.saveFile(file, name, type, uploadedBy);

        assertNotNull(result);
        assertEquals(name, result.getName());
        assertEquals(type, result.getType());
        assertEquals(uploadedBy, result.getUploadedBy());
    }


    @Test
    void testSaveFile_ExistingFile() throws IOException, SQLException {
        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;

        MultipartFile file = Mockito.mock(MultipartFile.class);
        when(file.getName()).thenReturn("file.pdf");
        when(file.getBytes()).thenReturn("Sample content".getBytes());

        FileEntity existingFile = new FileEntity();
        existingFile.setName(name);
        existingFile.setUploadedBy(uploadedBy);
        existingFile.setType(type);
        when(fileEntityRepository.findByName(name)).thenReturn(existingFile);

        when(fileEntityRepository.save(any(FileEntity.class))).thenReturn(existingFile);

        FileEntity result = fileService.saveFile(file, name, type, uploadedBy);
        assertNotNull(result);
        assertEquals(name, result.getName());
        assertEquals(type, result.getType());
        assertEquals(uploadedBy, result.getUploadedBy());
    }

    @Test
    void testSaveFile_IOError() throws IOException, SQLException {
        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;

        MultipartFile file = Mockito.mock(MultipartFile.class);
        when(file.getName()).thenReturn("file.pdf");
        when(file.getInputStream()).thenThrow(IOException.class);

        when(fileEntityRepository.findByName(name)).thenReturn(null);

        assertThrows(FileServiceException.class, () -> {
            fileService.saveFile(file, name, type, uploadedBy);
        });
    }

    @Test
    void testSearchFilesByKeyword() {

        String keyword = "testKeyword";
        List<FileDocument> fileDocuments = List.of(
                new FileDocument(1, "Document1", "pdf", "content1", 1, LocalDate.now(), LocalDate.now()),
                new FileDocument(2, "Document2","pdf",  "content2", 1, LocalDate.now(), LocalDate.now())
        );

        when(elasticSearchService.searchByKeyword(keyword)).thenReturn(fileDocuments);

        List<FileSearchResult> expectedResults = fileDocuments.stream()
                .map(doc -> new FileSearchResult(doc.getId(), doc.getName()))
                .collect(Collectors.toList());


        List<FileSearchResult> results = fileService.searchFilesByKeyword(keyword);


        assertNotNull(results);
        assertEquals(expectedResults.size(), results.size());
        for (int i = 0; i < results.size(); i++) {
            assertEquals(expectedResults.get(i).getId(), results.get(i).getId());
            assertEquals(expectedResults.get(i).getName(), results.get(i).getName());
        }
    }

    @Test
    void testSaveFile_IndexingFailure() throws IOException {

        String name = "example.pdf";
        FileType type = FileType.pdf;
        Integer uploadedBy = 1;
        MultipartFile file = Mockito.mock(MultipartFile.class);
        when(file.getInputStream()).thenReturn(new ByteArrayInputStream("Sample content".getBytes()));
        when(fileEntityRepository.findByName(name)).thenReturn(null);

        FileEntity savedFile = new FileEntity();
        savedFile.setName(name);
        savedFile.setType(type);
        savedFile.setUploadedBy(uploadedBy);
        when(fileEntityRepository.save(any(FileEntity.class))).thenReturn(savedFile);

        doThrow(new RuntimeException("Indexing failed")).when(elasticSearchService).indexFile(any(FileEntity.class));

        Exception exception = assertThrows(RuntimeException.class, () -> fileService.saveFile(file, name, type, uploadedBy));
        assertEquals("Indexing failed", exception.getMessage());

        verify(fileEntityRepository).save(any(FileEntity.class));
    }

    @Test
    void testCreateNotifications() {
        int uploadedBy = 1;
        FileEntity fileEntity = new FileEntity();
        fileEntity.setId(123);

        User user1 = new User();
        user1.setId(2);
        User user2 = new User();
        user2.setId(3);

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        fileService.createNotifications(fileEntity, uploadedBy);
        verify(notificationRepository, times(2)).save(any(Notification.class));
    }
}
