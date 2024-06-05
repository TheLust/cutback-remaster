package com.cutback.backend.dto.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {

    private String message;
    private ErrorCode errorCode;
    private Map<String, String> errors;
}
