package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.auth.Account;
import com.cutback.backend.model.auth.AccountDetails;
import com.cutback.backend.model.auth.Role;
import com.cutback.backend.security.JwtUtils;
import com.cutback.backend.service.impl.AccountService;
import com.cutback.backend.validator.AccountValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class AuthFacade {

    private final AccountService accountService;
    private final Mapper mapper;
    private final AccountValidator accountValidator;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public String login(AuthRequest authRequest,
                        BindingResult bindingResult) {
        accountValidator.throwErrors(bindingResult);
        return generateToken(authRequest);
    }

    public String register(AuthRequest authRequest,
                           BindingResult bindingResult) {
        Account account = mapper.toEntity(authRequest);
        account.setRole(Role.USER);
        account.setActive(true);
        account.setEnabled(true);

        accountValidator.validate(account, bindingResult);
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        accountService.insert(account);

        return generateToken(authRequest);
    }

    private String generateToken(AuthRequest authRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
        );

        try {
            Authentication auth = authenticationManager.authenticate(authenticationToken);
            AccountDetails accountDetails = (AccountDetails) auth.getPrincipal();
            return jwtUtils.generateToken(accountDetails.getAccount());

        } catch (BadCredentialsException e) {
            throw new CutbackException("Incorrect username or/and password", ErrorCode.BAD_CREDENTIALS);
        }
    }
}
