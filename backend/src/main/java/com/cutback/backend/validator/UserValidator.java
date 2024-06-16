package com.cutback.backend.validator;

import com.cutback.backend.model.auth.User;
import com.cutback.backend.service.impl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@RequiredArgsConstructor
public class UserValidator extends BasicValidator<User> {

    private final UserService userService;

    @Override
    public void validate(User target, Errors errors) {
        super.validate(target, errors);

        checkUnique(
                "username",
                target,
                userService.findByUsername(target.getUsername()),
                errors
        );

        throwErrors(errors);
    }

    public void validateNoThrow(User target, Errors errors) {
        super.validate(target, errors);

        checkUnique(
                "username",
                target,
                userService.findByUsername(target.getUsername()),
                errors
        );
    }
}
