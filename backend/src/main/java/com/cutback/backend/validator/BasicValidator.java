package com.cutback.backend.validator;

import com.cutback.backend.constant.ConstraintViolationCodes;
import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.exception.ValidationException;
import jakarta.persistence.Id;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import org.springframework.validation.Errors;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.Optional;

public class BasicValidator<T> {

    private final Field ID_FIELD;

    public BasicValidator() {
        this.ID_FIELD = getIdField();
    }

    public void validate(T target, Errors errors) {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            jakarta.validation.Validator validator = factory.getValidator();

            for (ConstraintViolation<T> violation : validator.validate(target)) {
                errors.rejectValue(violation.getPropertyPath().toString(), violation.getMessage());
            }
        } catch (Exception e) {
            throw new CutbackException("Cannot get validator from factory", ErrorCode.INTERNAL_ERROR);
        }
    }

    public void validateAndThrow(T target, Errors errors) {
        validate(target, errors);
        throwErrors(errors);
    }

    public void throwErrors(Errors errors) {
        if (errors.hasErrors()) {
            throw new ValidationException(errors);
        }
    }

    public void checkUnique(String field,
                            T entity,
                            Optional<T> foundEntity,
                            Errors errors) {
        if (foundEntity.isPresent()) {
            errors.rejectValue(field, ConstraintViolationCodes.UNIQUE);
        }
    }

    @SuppressWarnings("unchecked")
    private Field getIdField() {
        Class<T> clazz = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass())
                .getActualTypeArguments()[0];

        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(Id.class)) {
                return field;
            }
        }

        throw new RuntimeException("Could not create generic service because the entity does not have an id field");
    }

    private Object getIdValue(T entity) {
        ID_FIELD.setAccessible(true);
        try {
            return ID_FIELD.get(entity);
        } catch (IllegalAccessException e) {
            throw new CutbackException("", ErrorCode.INTERNAL_ERROR);//TODO write error
        }
    }
}
