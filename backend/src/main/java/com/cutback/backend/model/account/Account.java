package com.cutback.backend.model.account;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.constant.Constraints;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.image.Image;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @OneToOne
    private User user;

    @OneToOne
    private Image image;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @OneToOne(cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Preferences preferences;

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

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    @Email(message = ConstraintViolationCodes.EMAIL)
    private String email;

    @Pattern(
            regexp = Constraints.User.PHONE_NUMBER_PATTERN,
            message = ConstraintViolationCodes.Pattern.PHONE_NUMBER
    )
    private String phoneNumber;
}
