package com.cutback.backend.facade;

import com.cutback.backend.dto.error.ErrorCode;
import com.cutback.backend.exception.CutbackException;
import com.cutback.backend.model.account.Account;
import com.cutback.backend.model.auth.Role;
import com.cutback.backend.model.auth.User;
import com.cutback.backend.model.company.Company;

public class RoleBasedFacade {

    public void isAuthenticated(User user) {
        if (user == null) {
            throw new CutbackException(
                    "Not authenticated",
                    ErrorCode.UNAUTHORIZED
            );
        }
    }

    public void checkNotUser(User user) {
        isAuthenticated(user);
        if (Role.USER.equals(user.getRole())) {
            throw new CutbackException(
                    "Access denied for users",
                    ErrorCode.ACCESS_DENIED
            );
        }
    }

    public void isCompanyMember(User user, Company company) {
        checkNotUser(user);
        if (Role.ADMIN.equals(user.getRole())) {
            return;
        }

        Account account = user.getAccount();
        if (account == null) {
            throw new CutbackException(
                    "User w/o account",
                    ErrorCode.USER_WO_ACCOUNT
            );
        } else {
            if (Role.MASTER.equals(user.getRole())) {
                boolean isOwner = account.getOwnerOf()
                        .stream()
                        .anyMatch(ownerOf -> company.getId().equals(ownerOf.getId()));
                if (!isOwner) {
                    throw new CutbackException(
                            "Not a master of required company",
                            ErrorCode.ACCESS_DENIED
                    );
                }
            } else if (Role.EMPLOYEE.equals(user.getRole())) {
                if (!company.getId().equals(account.getEmployeeOf().getId())) {
                    throw new CutbackException(
                            "Not a employee or required company",
                            ErrorCode.ACCESS_DENIED
                    );
                }
            } else {
                throw new CutbackException(
                        "Unrecognized role",
                        ErrorCode.INTERNAL_ERROR
                );
            }
        }
    }

    public void isAdmin(User user) {
        isAuthenticated(user);
        if (!Role.ADMIN.equals(user.getRole())) {
            throw new CutbackException(
                    "Access denied; Not admin",
                    ErrorCode.ACCESS_DENIED);
        }
    }

    public void isMaster(User user, Company company) {
        isAuthenticated(user);
        Account account = user.getAccount();
        if (account == null) {
            throw new CutbackException(
                    "User w/o account",
                    ErrorCode.USER_WO_ACCOUNT
            );
        } else {
            if (Role.MASTER.equals(user.getRole())) {
                boolean isOwner = account.getOwnerOf()
                        .stream()
                        .anyMatch(ownerOf -> company.getId().equals(ownerOf.getId()));
                if (!isOwner) {
                    throw new CutbackException(
                            "Not a master of required company",
                            ErrorCode.ACCESS_DENIED
                    );
                }
            } else {
                throw new CutbackException(
                        "Access denied",
                        ErrorCode.ACCESS_DENIED
                );
            }
        }
    }
}
