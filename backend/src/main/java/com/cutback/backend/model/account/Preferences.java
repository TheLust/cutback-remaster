package com.cutback.backend.model.account;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    private Language language;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    private Theme theme;
}
