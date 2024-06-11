package com.cutback.backend.dto.response;

import com.cutback.backend.model.Gender;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Profile {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate birthDate;
    private String email;
    private String phoneNumber;
}
