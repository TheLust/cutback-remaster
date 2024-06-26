package com.cutback.backend.service.impl.account;

import com.cutback.backend.model.auth.User;
import com.cutback.backend.repository.UserRepository;
import com.cutback.backend.service.impl.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService extends CrudService<User, Long> {

    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }
}
