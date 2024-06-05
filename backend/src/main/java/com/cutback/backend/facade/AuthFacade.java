package com.cutback.backend.facade;

import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.auth.Account;
import com.cutback.backend.model.auth.Role;
import com.cutback.backend.service.impl.AccountService;
import com.cutback.backend.validator.AccountValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class AuthFacade {

    private final AccountService accountService;
    private final Mapper mapper;
    private final AccountValidator accountValidator;

    public String login(AuthRequest authRequest,
                        BindingResult bindingResult) {
        Account account = mapper.toEntity(authRequest);
    }

    public String register(AuthRequest authRequest,
                           BindingResult bindingResult) {
        Account account = mapper.toEntity(authRequest);
        account.setRole(Role.USER);
        account.setActive(true);
        account.setEnabled(true);

        accountValidator.validate(account, bindingResult);
    }
}
