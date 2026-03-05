package com.sunocean.service;

import com.sunocean.dto.CategoryDTO;
import com.sunocean.dto.LinkDTO;
import com.sunocean.entity.Category;
import com.sunocean.entity.Link;
import com.sunocean.repository.CategoryRepository;
import com.sunocean.repository.LinkRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final LinkRepository linkRepository;
    
    public CategoryService(CategoryRepository categoryRepository, LinkRepository linkRepository) {
        this.categoryRepository = categoryRepository;
        this.linkRepository = linkRepository;
    }
    
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setIcon(categoryDTO.getIcon());
        category.setColor(categoryDTO.getColor());
        category.setSortOrder(categoryDTO.getSortOrder());
        
        Category saved = categoryRepository.save(category);
        return convertToDTO(saved);
    }
    
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setIcon(categoryDTO.getIcon());
        category.setColor(categoryDTO.getColor());
        category.setSortOrder(categoryDTO.getSortOrder());
        
        Category updated = categoryRepository.save(category);
        return convertToDTO(updated);
    }
    
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setIcon(category.getIcon());
        dto.setColor(category.getColor());
        dto.setSortOrder(category.getSortOrder());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setUpdatedAt(category.getUpdatedAt());
        
        if (category.getLinks() != null) {
            List<LinkDTO> linkDTOs = category.getLinks().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            dto.setLinks(linkDTOs);
        }
        
        return dto;
    }
    
    private LinkDTO convertToDTO(Link link) {
        LinkDTO dto = new LinkDTO();
        dto.setId(link.getId());
        dto.setTitle(link.getTitle());
        dto.setUrl(link.getUrl());
        dto.setDescription(link.getDescription());
        dto.setIcon(link.getIcon());
        dto.setLinkType(link.getLinkType());
        dto.setVisitCount(link.getVisitCount());
        dto.setSortOrder(link.getSortOrder());
        dto.setCreatedAt(link.getCreatedAt());
        dto.setUpdatedAt(link.getUpdatedAt());
        
        if (link.getCategory() != null) {
            dto.setCategoryId(link.getCategory().getId());
            dto.setCategoryName(link.getCategory().getName());
        }
        
        return dto;
    }
}