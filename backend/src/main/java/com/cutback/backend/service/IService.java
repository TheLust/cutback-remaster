package com.cutback.backend.service;

import jakarta.transaction.Transactional;

import java.util.List;

public interface IService<T, G> {

    List<T> findAll();
    T findById(G id);
    @Transactional
    T insert(T entity);

    @Transactional
    T update(T currentEntity, T updatedEntity);

    @Transactional
    void delete(T entity);
}
