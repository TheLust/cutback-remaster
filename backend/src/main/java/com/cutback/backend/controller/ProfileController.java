package com.cutback.backend.controller;

import com.cutback.backend.dto.request.ChangePasswordRequest;
import com.cutback.backend.dto.response.Profile;
import com.cutback.backend.facade.ProfileFacade;
import com.cutback.backend.model.auth.UserDetails;
import com.cutback.backend.model.image.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @DeleteMapping("/user")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetails userDetails) {
        profileFacade.deleteUser(userDetails.getUser());
        return ResponseEntity.ok().build();
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

    @PutMapping("/change-image")
    public ResponseEntity<byte[]> changeImage(@AuthenticationPrincipal UserDetails userDetails,
                                              @RequestPart("image") MultipartFile imageFile) {
        return new ResponseEntity<>(
                profileFacade.changeImage(
                        userDetails.getUser(),
                        imageFile
                ),
                HttpStatus.OK
        );
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage(@AuthenticationPrincipal UserDetails userDetails,
                                           @RequestParam("size") Size size) {
        return new ResponseEntity<>(
                profileFacade.getImage(
                        userDetails.getUser(),
                        size
                ),
                HttpStatus.OK
        );
    }
}
