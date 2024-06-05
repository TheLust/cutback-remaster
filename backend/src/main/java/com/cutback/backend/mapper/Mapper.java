package com.cutback.backend.mapper;

import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.model.auth.Account;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Mapper {

    private final ModelMapper mapper;

    public Account toEntity(AuthRequest authRequest) {
        return mapper.map(authRequest, Account.class);
    }
}
