package com.cutback.backend.model.image;

import lombok.Getter;

import java.util.Optional;

@Getter
public enum ImageExtension {

    JPG("jpg"),
    JPEG("jpeg"),
    PNG("png");

    final String value;

    ImageExtension(String value) {
        this.value = value;
    }

    public static Optional<ImageExtension> findByValue(String value){
        for(ImageExtension v : values()){
            if( v.getValue().equals(value)){
                return Optional.of(v);
            }
        }
        return Optional.empty();
    }
}
