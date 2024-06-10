package com.cutback.backend.exception;

import com.cutback.backend.dto.error.ErrorCode;
import lombok.Getter;

import java.util.Map;

@Getter
public class CutbackException extends RuntimeException {

    private final String message;
    private final ErrorCode errorCode;

    public CutbackException(String message, ErrorCode errorCode) {
        this.message = message;
        this.errorCode = errorCode;
    }
}
