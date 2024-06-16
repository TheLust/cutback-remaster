package com.cutback.backend.controller;

import com.cutback.backend.dto.request.ChangePasswordRequest;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.facade.ProfileFacade;
import com.cutback.backend.model.auth.UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileFacade profileFacade;

    @GetMapping
    public ResponseEntity<Profile> get(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(
                profileFacade.get(userDetails.getUser()),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity<Profile> create(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestBody Profile profile,
                                          BindingResult bindingResult) {
        return new ResponseEntity<>(
                profileFacade.create(
                        userDetails.getUser(),
                        profile,
                        bindingResult
                ),
                HttpStatus.OK
        );
    }

    @PutMapping
    public ResponseEntity<Profile> update(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestBody Profile profile,
                                          BindingResult bindingResult) {
        return new ResponseEntity<>(
                profileFacade.update(
                        userDetails.getUser(),
                        profile,
                        bindingResult
                ),
                HttpStatus.OK
        );
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                                 @RequestBody ChangePasswordRequest request,
                                                 BindingResult bindingResult) {
        return new ResponseEntity<>(
                profileFacade.changePassword(
                        userDetails.getUser(),
                        request,
                        bindingResult
                ),
                HttpStatus.OK
        );
    }
}
