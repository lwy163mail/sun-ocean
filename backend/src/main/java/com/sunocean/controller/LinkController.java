package com.sunocean.controller;

import com.sunocean.dto.LinkDTO;
import com.sunocean.service.LinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/links")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LinkController {
    private final LinkService linkService;
    
    @GetMapping
    public ResponseEntity<List<LinkDTO>> getAllLinks() {
        return ResponseEntity.ok(linkService.getAllLinks());
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<LinkDTO>> getLinksByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(linkService.getLinksByCategory(categoryId));
    }
    
    @GetMapping("/type/{linkType}")
    public ResponseEntity<List<LinkDTO>> getLinksByType(@PathVariable String linkType) {
        return ResponseEntity.ok(linkService.getLinksByType(linkType));
    }
    
    @PostMapping
    public ResponseEntity<LinkDTO> createLink(@RequestBody LinkDTO linkDTO) {
        return ResponseEntity.ok(linkService.createLink(linkDTO));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LinkDTO> updateLink(@PathVariable Long id, @RequestBody LinkDTO linkDTO) {
        return ResponseEntity.ok(linkService.updateLink(id, linkDTO));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        linkService.deleteLink(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}/visit")
    public ResponseEntity<LinkDTO> incrementVisitCount(@PathVariable Long id) {
        return ResponseEntity.ok(linkService.incrementVisitCount(id));
    }
}