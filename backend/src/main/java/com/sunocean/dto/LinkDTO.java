package com.sunocean.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LinkDTO {
    private Long id;
    private String title;
    private String url;
    private String description;
    private String icon;
    private String linkType;
    private Integer visitCount;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long categoryId;
    private String categoryName;
}