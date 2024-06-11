package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.Account;
import com.cutback.backend.model.auth.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProfileFacade {

    private final Mapper mapper;

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
}
