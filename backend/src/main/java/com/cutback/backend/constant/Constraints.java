package com.cutback.backend.constant;

public interface Constraints {

    interface Account {
        int USERNAME_MIN = 1;
        int USERNAME_MAX = 128;
        int PASSWORD_MIN = 8;
        int PASSWORD_MAX = 256;
    }

    interface User {
        String PHONE_NUMBER_PATTERN = "^\\+\\d{5,17}$";
    }
}
