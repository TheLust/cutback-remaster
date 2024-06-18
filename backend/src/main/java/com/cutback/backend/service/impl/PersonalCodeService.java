package com.cutback.backend.service.impl;

import com.cutback.backend.model.PersonalCode;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.repository.AccountRepository;
import com.cutback.backend.repository.PersonalCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PersonalCodeService extends CrudService<PersonalCode, UUID> {

    @Autowired
    public PersonalCodeService(PersonalCodeRepository repository) {
        super(repository);
    }
}
