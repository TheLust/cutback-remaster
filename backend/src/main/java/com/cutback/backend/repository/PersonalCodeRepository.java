package com.cutback.backend.repository;

import com.cutback.backend.model.account.PersonalCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PersonalCodeRepository extends JpaRepository<PersonalCode, UUID> {
}
