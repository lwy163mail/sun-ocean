package com.sunocean.service;

import com.sunocean.dto.LinkDTO;
import com.sunocean.entity.Category;
import com.sunocean.entity.Link;
import com.sunocean.repository.CategoryRepository;
import com.sunocean.repository.LinkRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LinkService {
    private final LinkRepository linkRepository;
    private final CategoryRepository categoryRepository;
    
    public LinkService(LinkRepository linkRepository, CategoryRepository categoryRepository) {
        this.linkRepository = linkRepository;
        this.categoryRepository = categoryRepository;
    }
    
    public List<LinkDTO> getAllLinks() {
        return linkRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<LinkDTO> getLinksByCategory(Long categoryId) {
        return linkRepository.findByCategoryIdOrderBySortOrderAsc(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<LinkDTO> getLinksByType(String linkType) {
        return linkRepository.findByLinkTypeOrderBySortOrderAsc(linkType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public LinkDTO createLink(LinkDTO linkDTO) {
        Link link = new Link();
        link.setTitle(linkDTO.getTitle());
        link.setUrl(linkDTO.getUrl());
        link.setDescription(linkDTO.getDescription());
        link.setIcon(linkDTO.getIcon());
        link.setLinkType(linkDTO.getLinkType());
        link.setVisitCount(linkDTO.getVisitCount());
        link.setSortOrder(linkDTO.getSortOrder());
        
        if (linkDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(linkDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            link.setCategory(category);
        }
        
        Link saved = linkRepository.save(link);
        return convertToDTO(saved);
    }
    
    public LinkDTO updateLink(Long id, LinkDTO linkDTO) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Link not found"));
        
        link.setTitle(linkDTO.getTitle());
        link.setUrl(linkDTO.getUrl());
        link.setDescription(linkDTO.getDescription());
        link.setIcon(linkDTO.getIcon());
        link.setLinkType(linkDTO.getLinkType());
        link.setVisitCount(linkDTO.getVisitCount());
        link.setSortOrder(linkDTO.getSortOrder());
        
        if (linkDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(linkDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            link.setCategory(category);
        }
        
        Link updated = linkRepository.save(link);
        return convertToDTO(updated);
    }
    
    public void deleteLink(Long id) {
        linkRepository.deleteById(id);
    }
    
    public LinkDTO incrementVisitCount(Long id) {
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Link not found"));
        
        link.setVisitCount(link.getVisitCount() + 1);
        Link updated = linkRepository.save(link);
        return convertToDTO(updated);
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