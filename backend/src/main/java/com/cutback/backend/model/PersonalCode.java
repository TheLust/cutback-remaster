package com.cutback.backend.model;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.model.account.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
public class PersonalCode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @JsonIgnore
    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @OneToOne
    private Account account;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    private LocalDateTime createdAt;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    private LocalDateTime expiresAt;

    public boolean isExpired() {
        return expiresAt.isBefore(LocalDateTime.now());
    }
}
