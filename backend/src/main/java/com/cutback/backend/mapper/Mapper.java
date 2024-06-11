package com.cutback.backend.mapper;

import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.model.Account;
import com.cutback.backend.model.auth.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Mapper {

    private final ModelMapper mapper;

    public User toEntity(AuthRequest authRequest) {
        return mapper.map(authRequest, User.class);
    }

    public Profile toProfile(Account account) {
        Profile profile = mapper.map(account, Profile.class);
        profile.setUsername(account.getUser().getUsername());
        return profile;
    }
}
