package com.cutback.backend.repository;

import com.cutback.backend.model.PersonalCode;
import com.cutback.backend.model.auth.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PersonalCodeRepository extends JpaRepository<PersonalCode, UUID> {
}
