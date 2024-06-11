package com.cutback.backend.service.impl;

import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.auth.UserDetails;
import com.cutback.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> account = userRepository.findByUsername(username);
        if (account.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        return new UserDetails(account.get());
    }
}
