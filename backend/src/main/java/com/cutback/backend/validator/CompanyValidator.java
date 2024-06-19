package com.cutback.backend.validator;

import com.cutback.backend.model.company.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
@RequiredArgsConstructor
public class CompanyValidator extends BasicValidator<Company> {

    @Override
    public void validate(Company target, Errors errors) {
        validateNoThrow(target, errors);
        throwErrors(errors);
    }

    public void validateNoThrow(Company target, Errors errors) {
        super.validate(target, errors);
    }
}
