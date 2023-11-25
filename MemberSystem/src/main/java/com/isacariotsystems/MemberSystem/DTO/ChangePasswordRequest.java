package com.isacariotsystems.MemberSystem.DTO;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private Long userId;
    private String newPassword;
    private String oldPassword;
}
