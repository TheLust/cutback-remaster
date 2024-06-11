package com.cutback.backend.controller;

import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.facade.ProfileFacade;
import com.cutback.backend.model.auth.UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileFacade profileFacade;

    @GetMapping
    public ResponseEntity<Profile> login(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(
                profileFacade.get(userDetails.getUser()),
                HttpStatus.OK
        );
    }
}
