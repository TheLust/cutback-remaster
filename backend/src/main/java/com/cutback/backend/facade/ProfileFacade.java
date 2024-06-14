package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.account.Language;
import com.cutback.backend.model.account.Preferences;
import com.cutback.backend.model.account.Theme;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.service.impl.AccountService;
import com.cutback.backend.validator.AccountValidator;
import com.cutback.backend.validator.PreferencesValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final AccountService accountService;
    private final Mapper mapper;
    private final AccountValidator accountValidator;
    private final PreferencesValidator preferencesValidator;

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
}
