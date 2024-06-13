package com.cutback.backend.service.impl;

import com.cutback.backend.model.account.Account;
import com.cutback.backend.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService extends CrudService<Account, Long> {

    private final AccountRepository repository;

    @Autowired
    public AccountService(AccountRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public Optional<Account> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<Account> findByPhoneNumber(String phoneNumber) {
        return repository.findByPhoneNumber(phoneNumber);
    }
}
