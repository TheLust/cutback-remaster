package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.mapper.Mapper;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.auth.UserDetails;
import com.cutback.backend.model.auth.Role;
import com.cutback.backend.security.JwtUtils;
import com.cutback.backend.service.impl.UserService;
import com.cutback.backend.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
@RequiredArgsConstructor
public class AuthFacade {

    private final UserService userService;
    private final Mapper mapper;
    private final UserValidator userValidator;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public String login(AuthRequest authRequest,
                        BindingResult bindingResult) {
        userValidator.throwErrors(bindingResult);
        return generateToken(authRequest);
    }

    public String register(AuthRequest authRequest,
                           BindingResult bindingResult) {
        User user = mapper.toEntity(authRequest);
        user.setRole(Role.USER);
        user.setActive(true);
        user.setEnabled(true);

        userValidator.validate(user, bindingResult);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.insert(user);

        return generateToken(authRequest);
    }

    private String generateToken(AuthRequest authRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                authRequest.getUsername(),
                authRequest.getPassword()
        );

        try {
            Authentication auth = authenticationManager.authenticate(authenticationToken);
            UserDetails userDetails = (UserDetails) auth.getPrincipal();
            return jwtUtils.generateToken(userDetails.getUser());

        } catch (BadCredentialsException e) {
            throw new CutbackException("Incorrect username or/and password", ErrorCode.BAD_CREDENTIALS);
        }
    }
}
