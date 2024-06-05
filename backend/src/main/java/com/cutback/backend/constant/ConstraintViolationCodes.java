package com.cutback.backend.constant;

public interface ConstraintViolationCodes {

    interface Pattern {
        String PHONE_NUMBER = "phone_number";
    }

    String REQUIRED = "required";
    String LENGTH = "length {\"min\": {min}, \"max\": {max}}";
    String EMAIL = "email";
    String PAST = "past";
    String UNIQUE = "unique";
}
