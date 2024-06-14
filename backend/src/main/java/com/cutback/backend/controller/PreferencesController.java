package com.cutback.backend.controller;

import com.cutback.backend.facade.ProfileFacade;
import com.cutback.backend.model.account.Preferences;
import com.cutback.backend.model.auth.UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.url.base}/profile/preferences")
@RequiredArgsConstructor
public class PreferencesController {

    private final ProfileFacade profileFacade;

    @PutMapping
    public ResponseEntity<Void> create(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestBody Preferences preferences,
                                          BindingResult bindingResult) {
        profileFacade.updatePreferences(
                userDetails.getUser(),
                preferences,
                bindingResult
        );

        return ResponseEntity.ok().build();
    }
}
