package com.cutback.backend.controller;

import com.cutback.backend.dto.request.AuthRequest;
import com.cutback.backend.facade.AuthFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthFacade authFacade;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest,
                                        BindingResult bindingResult) {
        return new ResponseEntity<>(
                authFacade.login(authRequest, bindingResult),
                HttpStatus.OK
        );
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest authRequest,
                                           BindingResult bindingResult) {
        return new ResponseEntity<>(
                authFacade.register(authRequest, bindingResult),
                HttpStatus.OK
        );
    }
}
