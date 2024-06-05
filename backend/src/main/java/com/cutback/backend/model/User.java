package com.cutback.backend.model;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.constant.Constraints;
import com.cutback.backend.model.auth.Account;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "_user")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @OneToOne
    private Account account;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String firstName;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String lastName;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Past(message = ConstraintViolationCodes.PAST)
    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    private LocalDate birthDate;

    @Email(message = ConstraintViolationCodes.EMAIL)
    private String email;

    @Pattern(
            regexp = Constraints.User.PHONE_NUMBER_PATTERN,
            message = ConstraintViolationCodes.Pattern.PHONE_NUMBER
    )
    private String phoneNumber;
}
