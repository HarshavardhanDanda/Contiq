package com.contiq.fileservice.service;

import com.contiq.fileservice.dto.FileDTO;
import com.contiq.fileservice.dto.FileSearchResult;
import com.contiq.fileservice.dto.FileWithoutContent;
import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.entity.FileType;
import com.contiq.fileservice.entity.Notification;
import com.contiq.fileservice.entity.User;
import com.contiq.fileservice.exception.FileServiceException;
import com.contiq.fileservice.repository.FileEntityRepository;
import com.contiq.fileservice.repository.NotificationRepository;
import com.contiq.fileservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.extern.slf4j.XSlf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static com.contiq.fileservice.utils.Constants.*;

@Service
@Slf4j
public class FileService {

    private final ModelMapper modelMapper;

    private final FileEntityRepository fileEntityRepository;

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    private final ElasticSearchService elasticSearchService;

    @Autowired
    public FileService(ModelMapper modelMapper, FileEntityRepository fileEntityRepository, ElasticSearchService elasticSearchService, NotificationRepository notificationRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.fileEntityRepository = fileEntityRepository;
        this.elasticSearchService = elasticSearchService;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<FileWithoutContent> getAllFiles() {
        try {
            return fileEntityRepository.findAllFilesWithoutContent();
        } catch (Exception e) {
            log.error("Error retrieving all files", e);
            throw new FileServiceException(RETRIEVAL_ERROR, e);
        }
    }

    public Optional<FileDTO> getFileByFileID(Integer fileId) {
        try {
            Optional<FileEntity> fileEntityOptional = fileEntityRepository.findById(fileId);
            if (fileEntityOptional.isPresent()) {
                return fileEntityOptional.map(fileEntity -> modelMapper.map(fileEntity, FileDTO.class));
            } else {
                return Optional.empty();
            }
        } catch (Exception e) {
            log.error("Error retrieving file with ID: {}", fileId, e);
            throw new FileServiceException(RETRIEVAL_ERROR_ID, e);
        }
    }

    public FileEntity saveFile(MultipartFile file, String name, FileType type, Integer uploadedBy) throws SQLException, IOException {
        FileEntity existingFile = fileEntityRepository.findByName(name);
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        if (existingFile != null) {
            existingFile.setUploadedBy(uploadedBy);
            existingFile.setUpdatedAt(currentDateTimeIST);
            return fileEntityRepository.save(existingFile);
        }

        FileEntity newFile = new FileEntity();
        newFile.setName(name);
        newFile.setType(type);
        try (InputStream inputStream = file.getInputStream()) {
            byte[] buffer = new byte[4096];
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            newFile.setContent(byteArrayOutputStream.toByteArray());
        } catch (IOException e) {
            throw new FileServiceException(PROCESSING_ERROR, e);
        }
        newFile.setUploadedBy(uploadedBy);

        newFile.setCreatedAt(currentDateTimeIST);
        newFile.setUpdatedAt(currentDateTimeIST);

        FileEntity savedFile = fileEntityRepository.save(newFile);

        //create notifications for all users
        createNotifications(savedFile, uploadedBy);

        // elasticsearch Indexing File
        elasticSearchService.indexFile(newFile);
        return savedFile;
    }

    public List<FileWithoutContent> getAllFilesByUserId(Integer userId) {
        try {
            return fileEntityRepository.findAllFilesByUserId(userId);
        } catch (Exception e) {
            log.error("Error retrieving files by user ID: {}", userId, e);
            throw new FileServiceException(RETRIEVAL_ERROR, e);
        }
    }

    public List<FileSearchResult> searchFilesByKeyword(String keyword){
        return elasticSearchService.searchByKeyword(keyword).stream()
                .map(fileDocument -> new FileSearchResult(fileDocument.getId(), fileDocument.getName()))
                .toList();
    }

    public void createNotifications(FileEntity file, Integer uploadedBy) {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            if(user.getId() != uploadedBy){
                Notification notification = new Notification();
                ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
                notification.setFileId(file.getId());
                notification.setIsRead(false);
                notification.setUploadedBy(uploadedBy);
                notification.setUserId(user.getId());
                notification.setCreatedAt(currentDateTimeIST);
                notification.setUpdatedAt(currentDateTimeIST);
                notificationRepository.save(notification);
            }
        }
    }

}