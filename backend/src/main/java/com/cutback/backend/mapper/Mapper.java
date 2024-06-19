package com.cutback.backend.mapper;

import com.cutback.backend.dto.CompanyDto;
import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.company.Company;
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

    public Account toEntity(Profile profile) {
        Account account = mapper.map(profile, Account.class);
        if (account.getPhoneNumber() != null) {
            if (account.getPhoneNumber().isBlank() || account.getPhoneNumber().isEmpty()) {
                account.setPhoneNumber(null);
            }
        }

        return account;
    }

    public Profile toProfile(Account account) {
        Profile profile = mapper.map(account, Profile.class);
        profile.setUsername(account.getUser().getUsername());
        profile.setRole(account.getUser().getRole());
        return profile;
    }

    public Company toEntity(CompanyDto companyDto) {
        return mapper.map(companyDto, Company.class);
    }

    public CompanyDto toDto(Company company) {
        return mapper.map(company, CompanyDto.class);
    }
}
