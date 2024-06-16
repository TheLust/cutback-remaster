package com.cutback.backend.validator;

import com.cutback.backend.constant.ConstraintViolationCodes;
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
        this(true);
    }

    public BasicValidator(boolean isEntity) {
        this.ID_FIELD = isEntity ? getIdField() : null;
    }

    public void validate(T target, Errors errors) {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            jakarta.validation.Validator validator = factory.getValidator();

            for (ConstraintViolation<T> violation : validator.validate(target)) {
                errors.rejectValue(violation.getPropertyPath().toString(), violation.getMessage());
            }
        } catch (Exception e) {
            throw new RuntimeException("Cannot get validator from factory");
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
        if (ID_FIELD == null) {
            throw new RuntimeException("Cannot use this unique validator for non entities");
        }

        if (foundEntity.isPresent()) {
            Object entityId = getIdValue(entity);
            Object foundId = getIdValue(foundEntity.get());

            if (foundId.equals(entityId)) {
                return;
            }

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
            throw new RuntimeException("Could not get id value");
        }
    }
}
