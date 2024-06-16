package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.dto.request.ChangePasswordRequest;
import com.cutback.backend.dto.request.ExtendedChangePasswordRequest;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.exception.ValidationException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.account.Language;
import com.cutback.backend.model.account.Preferences;
import com.cutback.backend.model.account.Theme;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.service.impl.AccountService;
import com.cutback.backend.service.impl.UserService;
import com.cutback.backend.validator.AccountValidator;
import com.cutback.backend.validator.ChangePasswordValidator;
import com.cutback.backend.validator.PreferencesValidator;
import com.cutback.backend.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final AuthFacade authFacade;
    private final UserService userService;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final Mapper mapper;
    private final UserValidator userValidator;
    private final AccountValidator accountValidator;
    private final PreferencesValidator preferencesValidator;
    private final ChangePasswordValidator changePasswordValidator;

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
        Preferences preferences = new Preferences();
        preferences.setLanguage(Language.EN);
        preferences.setTheme(Theme.LIGHT);

        Account account = mapper.toEntity(profile);
        account.setPreferences(preferences);
        account.setUser(user);
        account.setId(null);

        accountValidator.validate(account, bindingResult);

        return mapper.toProfile(
                accountService.insert(account)
        );
    }

    public void updatePreferences(User user,
                                  Preferences preferences,
                                  BindingResult bindingResult) {
        preferencesValidator.validate(preferences,  bindingResult);
        Account account = user.getAccount();
        account.setPreferences(preferences);
        accountService.update(account, account);
    }

    public Profile update(User user,
                          Profile profile,
                          BindingResult bindingResult) {
        User backup = new User();
        BeanUtils.copyProperties(user, backup);
        Account account = user.getAccount();
        Account updatedAccount = mapper.toEntity(profile);
        updatedAccount.setId(account.getId());
        updatedAccount.setUser(user);
        updatedAccount.getPreferences().setId(account.getPreferences().getId());

        if (!user.getUsername().equals(profile.getUsername())) {
            user.setUsername(profile.getUsername());
            userValidator.validateNoThrow(user, bindingResult);
            if (bindingResult.hasErrors()) {
                accountValidator.validate(updatedAccount, bindingResult);
                accountValidator.throwErrors(bindingResult);
            }
            userService.update(user, user);
        }

        try {
            accountValidator.validate(updatedAccount, bindingResult);
            return mapper.toProfile(
                    accountService.update(account, updatedAccount)
            );
        } catch (Exception e) {
            userService.update(backup, backup);
            if (e instanceof ValidationException validationException) {
                throw validationException;
            }

            throw e;
        }
    }

    public String changePassword(User user,
                                 ChangePasswordRequest request,
                                 BindingResult bindingResult) {
        ExtendedChangePasswordRequest extendedChangePasswordRequest = new ExtendedChangePasswordRequest(request);
        extendedChangePasswordRequest.setUser(user);

        changePasswordValidator.validate(extendedChangePasswordRequest, bindingResult);

        user.setPassword(passwordEncoder.encode(extendedChangePasswordRequest.getNewPassword()));
        userService.update(user, user);

        AuthRequest authRequest = new AuthRequest();
        authRequest.setUsername(user.getUsername());
        authRequest.setPassword(extendedChangePasswordRequest.getNewPassword());
        return authFacade.login(authRequest, bindingResult);
    }
}
