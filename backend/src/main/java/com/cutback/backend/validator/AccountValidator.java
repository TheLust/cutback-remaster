package com.cutback.backend.validator;

import com.cutback.backend.model.account.Account;
import com.cutback.backend.service.impl.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@RequiredArgsConstructor
public class AccountValidator extends BasicValidator<Account> {

    private final AccountService accountService;

    @Override
    public void validate(Account target, Errors errors) {
        super.validate(target, errors);

        checkUnique(
                "email",
                target,
                accountService.findByEmail(target.getEmail()),
                errors
        );

        if (target.getPhoneNumber() != null) {
            checkUnique(
                    "phoneNumber",
                    target,
                    accountService.findByPhoneNumber(target.getPhoneNumber()),
                    errors
            );
        }

        throwErrors(errors);
    }
}
