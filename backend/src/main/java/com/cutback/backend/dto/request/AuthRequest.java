package com.cutback.backend.dto.request;

import com.cutback.backend.constant.ConstraintViolationCodes;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String username;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String password;
}
