package com.cutback.backend.model.auth;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.constant.Constraints;
import com.cutback.backend.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "account")
    private User user;

    @Column(unique = true)
    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    @Size(
            min = Constraints.Account.USERNAME_MIN,
            max = Constraints.Account.USERNAME_MAX,
            message = ConstraintViolationCodes.LENGTH
    )
    private String username;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    @Size(
            min = Constraints.Account.PASSWORD_MIN,
            max = Constraints.Account.PASSWORD_MAX,
            message = ConstraintViolationCodes.LENGTH
    )
    private String password;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean active;
    private boolean enabled;
}
