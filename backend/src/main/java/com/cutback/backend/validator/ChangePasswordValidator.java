package com.cutback.backend.validator;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.dto.request.ExtendedChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class ChangePasswordValidator extends BasicValidator<ExtendedChangePasswordRequest> {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ChangePasswordValidator(PasswordEncoder passwordEncoder) {
        super(false);
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void validate(ExtendedChangePasswordRequest target, Errors errors) {
        super.validate(target, errors);

        if (!passwordEncoder.matches(target.getCurrentPassword(), target.getUser().getPassword())) {
            errors.rejectValue("currentPassword", ConstraintViolationCodes.INCORRECT);
        }

        if (target.getNewPassword() != null
                && !target.getNewPassword().isBlank()
                && target.getConfirmNewPassword() != null
                && !target.getConfirmNewPassword().isBlank()) {
            if (!target.getNewPassword().equals(target.getConfirmNewPassword())) {
                errors.rejectValue("newPassword", ConstraintViolationCodes.MATCH);
                errors.rejectValue("confirmNewPassword", ConstraintViolationCodes.MATCH);
            }
        }

        if (!errors.hasErrors() && target.getCurrentPassword().equals(target.getNewPassword())) {
            errors.rejectValue("newPassword", ConstraintViolationCodes.SAME);
            errors.rejectValue("confirmNewPassword", ConstraintViolationCodes.SAME);
        }

        throwErrors(errors);
    }
}
