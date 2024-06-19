package com.cutback.backend.controller;

import com.cutback.backend.dto.CompanyDto;
import com.cutback.backend.facade.CompanyFacade;
import com.cutback.backend.model.auth.UserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.url.base}/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyFacade companyFacade;

    @GetMapping
    public ResponseEntity<List<CompanyDto>> getAll() {
        return new ResponseEntity<>(
                companyFacade.getAll(),
                HttpStatus.OK
        );
    }

    @GetMapping("/full")
    public ResponseEntity<List<CompanyDto>> getAllAdmin(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(
                companyFacade.getAll(userDetails.getUser()),
                HttpStatus.OK
        );
    }

    @PostMapping("/{master_id}")
    public ResponseEntity<CompanyDto> create(@AuthenticationPrincipal UserDetails userDetails,
                                             @PathVariable("master_id") Long masterId,
                                             @RequestBody CompanyDto company,
                                             BindingResult bindingResult) {
        return new ResponseEntity<>(
                companyFacade.create(
                        userDetails.getUser(),
                        masterId,
                        company,
                        bindingResult
                ),
                HttpStatus.OK
        );
    }
}
