package com.cutback.backend.service.impl.image;

import com.cutback.backend.model.image.Image;
import com.cutback.backend.repository.ImageRepository;
import com.cutback.backend.service.impl.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ImageService extends CrudService<Image, UUID> {

    @Autowired
    public ImageService(ImageRepository repository) {
        super(repository);
    }
}
