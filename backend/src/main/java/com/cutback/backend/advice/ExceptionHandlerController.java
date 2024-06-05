package com.cutback.backend.advice;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.error.ErrorResponse;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.exception.NotFoundException;
import com.cutback.backend.exception.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(CutbackException.class)
    private ResponseEntity<ErrorResponse> handleException(CutbackException e) {
        return new ResponseEntity<>(
                new ErrorResponse(e.getMessage(), e.getErrorCode(), null),
                e.getErrorCode().getStatus()
        );
    }

    @ExceptionHandler(NotFoundException.class)
    private ResponseEntity<ErrorResponse> handleException(NotFoundException e) {
        return new ResponseEntity<>(
                new ErrorResponse(e.getMessage(), ErrorCode.NOT_FOUND, e.getFieldByValue()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(ValidationException.class)
    private ResponseEntity<ErrorResponse> handleException(ValidationException e) {
        return new ResponseEntity<>(
                new ErrorResponse(e.getMessage(), ErrorCode.VALIDATION_ERROR, e.getErrors()),
                HttpStatus.BAD_REQUEST
        );
    }
}
