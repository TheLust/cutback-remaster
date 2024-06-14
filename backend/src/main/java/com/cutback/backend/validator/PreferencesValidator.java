package com.cutback.backend.validator;

import com.cutback.backend.model.account.Preferences;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@RequiredArgsConstructor
public class PreferencesValidator extends BasicValidator<Preferences> {

    @Override
    public void validate(Preferences target, Errors errors) {
        super.validate(target, errors);
        throwErrors(errors);
    }
}
