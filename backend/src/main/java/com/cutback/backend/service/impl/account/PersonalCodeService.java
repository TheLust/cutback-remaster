package com.cutback.backend.service.impl.account;

import com.cutback.backend.model.account.PersonalCode;
import com.cutback.backend.repository.PersonalCodeRepository;
import com.cutback.backend.service.impl.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PersonalCodeService extends CrudService<PersonalCode, UUID> {

    @Autowired
    public PersonalCodeService(PersonalCodeRepository repository) {
        super(repository);
    }
}
