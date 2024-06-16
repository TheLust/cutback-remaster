package com.cutback.backend.constant;

public interface ConstraintViolationCodes {

    interface Pattern {
        String PHONE_NUMBER = "phoneNumber";
    }

    String REQUIRED = "required";
    String LENGTH = "length(min:{min}, max:{max})";
    String EMAIL = "email";
    String PAST = "past";
    String UNIQUE = "unique";
    String INCORRECT = "incorrect";
    String MATCH = "match";
    String SAME = "same";
}
