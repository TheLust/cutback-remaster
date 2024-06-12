package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.Account;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.service.impl.AccountService;
import com.cutback.backend.validator.AccountValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final AccountService accountService;
    private final Mapper mapper;
    private final AccountValidator accountValidator;

    public Profile get(User user) {
        Account account = user.getAccount();
        if (account == null) {
            throw new CutbackException(
                    "Account not created for this user",
                    ErrorCode.USER_WO_ACCOUNT
            );
        }

        return mapper.toProfile(account);
    }

    public Profile create(User user,
                          Profile profile,
                          BindingResult bindingResult) {
        if (user.getAccount() != null) {
            throw new CutbackException(
                    "User already has account",
                    ErrorCode.BAD_REQUEST
            );
        }
        Account account = mapper.toEntity(profile);
        account.setUser(user);
        account.setId(null);

        accountValidator.validate(account, bindingResult);

        return mapper.toProfile(
                accountService.insert(account)
        );
    }
}
