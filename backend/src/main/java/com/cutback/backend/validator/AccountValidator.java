package com.cutback.backend.validator;

import com.cutback.backend.model.auth.Account;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class AccountValidator extends BasicValidator<Account> {

    @Override
    public void validate(Account target, Errors errors) {
        super.validate(target, errors);

    }
}
