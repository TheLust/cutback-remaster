package com.cutback.backend.exception;

import lombok.Getter;
import org.springframework.data.util.Pair;

import java.util.Map;
import java.util.Objects;

@Getter
public class NotFoundException extends RuntimeException {

    private final Map<String, String> fieldByValue;

    public NotFoundException(String field, Object value) {
        fieldByValue = Map.of(field, Objects.toString(value, null));
    }
}
