package com.cutback.backend.controller;

import com.cutback.backend.model.image.Size;
import com.cutback.backend.service.impl.image.ImageManager;
import com.cutback.backend.service.impl.image.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("${api.url.base}/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageManager imageManager;

    @GetMapping("/{image_uuid}")
    public ResponseEntity<byte[]> get(@PathVariable("image_uuid") UUID uuid,
                                      @RequestParam("size") Size size) {
        return new ResponseEntity<>(
                imageManager.get(imageService.findById(uuid), size),
                HttpStatus.OK
        );
    }
}
