package com.cutback.backend.exception;

import lombok.Getter;
import org.springframework.validation.Errors;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ValidationException extends RuntimeException {

    private final Map<String, String> errors;

    public ValidationException(Errors errors) {
        Map<String, String> errorMap = new HashMap<>();
        errors.getFieldErrors()
                .forEach(fieldError -> errorMap.put(fieldError.getField(), fieldError.getCode()));

        this.errors = errorMap;
    }
}
