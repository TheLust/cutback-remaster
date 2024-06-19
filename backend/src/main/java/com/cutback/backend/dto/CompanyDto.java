package com.cutback.backend.dto;

import com.cutback.backend.model.image.Image;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyDto {

    private Long id;
    private Image image;
    private String name;
    private boolean enabled;
}
