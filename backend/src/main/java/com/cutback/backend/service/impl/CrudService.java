package com.cutback.backend.service.impl;

import com.cutback.backend.exception.NotFoundException;
import com.cutback.backend.service.IService;
import jakarta.persistence.Id;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public class CrudService<T, G> implements IService<T, G> {

    private final JpaRepository<T, G> repository;
    private final String ID_FIELD_NAME;

    public CrudService(JpaRepository<T, G> repository) {
        this.repository = repository;
        this.ID_FIELD_NAME = getIdField(getClassOfT()).getName();
    }

    private Field getIdField(Class<?> clazz) {
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(Id.class)) {
                return field;
            }
        }

        throw new RuntimeException("Could not create generic service because the entity does not have an id field");
    }

    @SuppressWarnings("unchecked")
    private Class<T> getClassOfT() {
        return (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0];
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public T findById(G id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException(ID_FIELD_NAME, id));
    }

    @Override
    public T insert(T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(T currentEntity, T updatedEntity) {
        BeanUtils.copyProperties(updatedEntity, currentEntity, ID_FIELD_NAME);
        return repository.save(currentEntity);
    }

    @Override
    public void delete(T entity) {
        repository.delete(entity);
    }
}
