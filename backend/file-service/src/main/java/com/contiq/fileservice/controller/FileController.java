package com.contiq.fileservice.controller;

import com.contiq.fileservice.dto.FileDTO;

import com.contiq.fileservice.dto.FileSearchResult;
import com.contiq.fileservice.dto.FileWithoutContent;
import com.contiq.fileservice.entity.FileEntity;
import com.contiq.fileservice.entity.FileType;
import com.contiq.fileservice.service.FileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.contiq.fileservice.utils.Constants.UPLOAD_FAILURE;
import static com.contiq.fileservice.utils.Constants.UPLOAD_SUCCESS;

@RestController
@CrossOrigin(origins = {"http://localhost:3000","https://bc127fe.spcluster.tk"},methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.PATCH}, exposedHeaders = {"Content-Disposition"})
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<FileWithoutContent>> getAllFiles() {
        List<FileWithoutContent> files = fileService.getAllFiles();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<FileWithoutContent>> getAllFilesByUserId(@RequestParam("userId") Integer userId) {
        List<FileWithoutContent> files = fileService.getAllFilesByUserId(userId);
        return new ResponseEntity<>(files, HttpStatus.OK);
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getFileByFileID(@PathVariable Integer fileId, HttpServletResponse response) {
        return fileService.getFileByFileID(fileId)
                .map(file -> {
                    if (file.getContent() != null) {
                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_PDF);
                        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
                        headers.setContentDispositionFormData("attachment", file.getName());
                        return new ResponseEntity<>(file.getContent(), headers, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("File not found".getBytes(), HttpStatus.NOT_FOUND);
                    }
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> saveFile(@RequestParam("file") MultipartFile file,
                                           @RequestParam("name") String name,
                                           @RequestParam("type") FileType type,
                                           @RequestParam("uploaded_by") String uploadedBy) {

        try {
            FileEntity savedFile = fileService.saveFile(file, name, type, Integer.parseInt(uploadedBy));
            return new ResponseEntity<>(UPLOAD_SUCCESS + savedFile.getId(), HttpStatus.OK);
        } catch (IOException | SQLException e) {
            return new ResponseEntity<>(UPLOAD_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchFilesByKeyword(@RequestParam("key") String key) {
        try {
            List<FileSearchResult> resultList = fileService.searchFilesByKeyword(key);
            if (resultList.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(resultList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

