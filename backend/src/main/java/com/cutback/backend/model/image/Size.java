package com.cutback.backend.model.image;

import lombok.Getter;

@Getter
public enum Size {
    ORIGINAL("original"),
    SMALL("small"),
    MEDIUM("medium"),
    LARGE("large");

    final String value;

    Size(String value) {
        this.value = value;
    }
}
