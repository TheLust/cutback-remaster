package com.cutback.backend.dto.error;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Builder
@Getter
@Setter
public class ErrorResponse {

    private String message;
    private ErrorCode errorCode;
    private Map<String, String> errors;
}
