package com.contiq.fileservice.service;

import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.helper.FileReaderService;
import com.contiq.fileservice.model.FileDocument;
import com.contiq.fileservice.repository.FileSearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@Slf4j
public class ElasticSearchService {

    private final FileReaderService fileReaderService;
    private final FileSearchRepository fileSearchRepository;

    @Autowired
    public ElasticSearchService(FileReaderService fileReaderService, FileSearchRepository fileSearchRepository) {
        this.fileReaderService = fileReaderService;
        this.fileSearchRepository = fileSearchRepository;
    }

    public void indexFile(FileEntity fileEntity) {
        try {
            /*
             Get String content from Bytes array to index and make is searchable String in Elastic search
             */
            String content = fileReaderService.parsePdfContent(fileEntity.getContent());

            /*
             * If File Document not exists in Elasticsearch Create New with same ID of File Entity
             */
            Optional<FileDocument> existingFileDoc = fileSearchRepository.findById(fileEntity.getId());
            if (existingFileDoc.isPresent()) {
                existingFileDoc.get().setUpdatedAt(LocalDate.now());
                fileSearchRepository.save(existingFileDoc.get());
            }

            FileDocument document = new FileDocument();
            document.setId(fileEntity.getId());
            document.setName(fileEntity.getName());
            document.setContent(content); // content stored as String
            document.setUploadedBy(fileEntity.getUploadedBy());
            document.setCreatedAt(LocalDate.now());
            document.setUpdatedAt(LocalDate.now());
            fileSearchRepository.save(document);
            log.info("Indexed file with ID: {}", fileEntity.getId());
        } catch (IOException e) {
            log.error("Error indexing file with ID: {}", fileEntity.getId(), e);
        }
    }

    public List<FileDocument> searchByKeyword(String keyword) {
        return fileSearchRepository.findAllByNameOrContent(keyword, keyword);
    }

}
