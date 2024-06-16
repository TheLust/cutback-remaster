package com.cutback.backend.dto.request;

import com.cutback.backend.model.auth.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExtendedChangePasswordRequest extends ChangePasswordRequest {

    public ExtendedChangePasswordRequest(ChangePasswordRequest changePasswordRequest) {
        setCurrentPassword(changePasswordRequest.getCurrentPassword());
        setNewPassword(changePasswordRequest.getNewPassword());
        setConfirmNewPassword(changePasswordRequest.getConfirmNewPassword());
    }

    private User user;
}
