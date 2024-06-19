package com.cutback.backend.model.company;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.image.Image;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Image image;

    @NotNull(message = ConstraintViolationCodes.REQUIRED)
    @ManyToOne
    private Account owner;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String name;

    private boolean enabled;
}
