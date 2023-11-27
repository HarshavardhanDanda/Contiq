package com.contiq.fileservice.repository;

import com.contiq.fileservice.model.FileDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;


public interface FileSearchRepository extends ElasticsearchRepository<FileDocument, Integer> {
    List<FileDocument> findAllByNameOrContent(String keyword, String name);
}
