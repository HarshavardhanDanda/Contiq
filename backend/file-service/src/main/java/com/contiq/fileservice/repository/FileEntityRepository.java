package com.contiq.fileservice.repository;

import com.contiq.fileservice.dto.FileWithoutContent;
import com.contiq.fileservice.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileEntityRepository extends JpaRepository<FileEntity, Integer> {

    List<FileEntity> findByUploadedBy(Integer userId);

    @Query("SELECT new com.contiq.fileservice.dto.FileWithoutContent(f.id, f.name, f.type, f.uploadedBy, f.createdAt, f.updatedAt) FROM FileEntity f")
    List<FileWithoutContent> findAllFilesWithoutContent();

    FileEntity findByName(String name);

    @Query("SELECT new com.contiq.fileservice.dto.FileWithoutContent(f.id, f.name, f.type, f.uploadedBy, f.createdAt, f.updatedAt) FROM FileEntity f WHERE f.uploadedBy = :userId")
    List<FileWithoutContent> findAllFilesByUserId(Integer userId);
}
