package com.contiq.fileservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(indexName = "files")
@Setting(settingPath = "static/files-elastic-settings.json")
@Mapping(mappingPath = "static/files-elastic-mapping.json")
public class FileDocument {

    @Id
    private Integer id;

    @Field(type = FieldType.Text, name = "name", analyzer = "custom_lowercase")
    private String name;

    @Field(type = FieldType.Text, name = "type", analyzer = "custom_lowercase")
    private String type;

    @Field(type = FieldType.Text, name = "content", analyzer = "custom_lowercase")
    private String content;

    @Field(type = FieldType.Integer, name = "uploaded_by")
    private Integer uploadedBy;

    @Field(type = FieldType.Date, name = "created_at")
    private LocalDate createdAt;

    @Field(type = FieldType.Date, name = "updated_at")
    private LocalDate updatedAt;
}
