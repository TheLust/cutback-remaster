package com.cutback.backend.dto.request;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.constant.Constraints;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String currentPassword;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    @Size(
            min = Constraints.Account.PASSWORD_MIN,
            max = Constraints.Account.PASSWORD_MAX,
            message = ConstraintViolationCodes.LENGTH
    )
    private String newPassword;

    @NotBlank(message = ConstraintViolationCodes.REQUIRED)
    private String confirmNewPassword;
}
