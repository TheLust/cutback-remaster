package com.cutback.backend.facade;

import com.cutback.backend.dto.CompanyDto;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.auth.Role;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.company.Company;
import com.cutback.backend.service.impl.account.AccountService;
import com.cutback.backend.service.impl.account.UserService;
import com.cutback.backend.service.impl.company.CompanyService;
import com.cutback.backend.validator.CompanyValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CompanyFacade extends RoleBasedFacade{

    private final CompanyService companyService;
    private final UserService userService;
    private final AccountService accountService;
    private final Mapper mapper;
    private final CompanyValidator companyValidator;

    public List<CompanyDto> getAll(User user) {
        isAdmin(user);

        return companyService.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public List<CompanyDto> getAll() {
        return companyService.findAll()
                .stream()
                .filter(Company::isEnabled)
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public CompanyDto create(User user,
                             Long masterId,
                             CompanyDto companyDto,
                             BindingResult bindingResult) {
        isAdmin(user);

        Account account = accountService.findById(masterId);
        Company company = mapper.toEntity(companyDto);
        company.setOwner(account);

        companyValidator.validate(company, bindingResult);
        company = companyService.insert(company);

        User master = account.getUser();
        if (!List.of(Role.ADMIN, Role.MASTER).contains(master.getRole())) {
            master.setRole(Role.MASTER);
            userService.update(user, user);
        }
        return mapper.toDto(company);
    }
}
