package com.cutback.backend.service.impl.company;

import com.cutback.backend.model.company.Company;
import com.cutback.backend.repository.CompanyRepository;
import com.cutback.backend.service.impl.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService extends CrudService<Company, Long> {

    @Autowired
    public CompanyService(CompanyRepository repository) {
        super(repository);
    }
}
