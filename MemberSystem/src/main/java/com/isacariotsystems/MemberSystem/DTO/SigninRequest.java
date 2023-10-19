package com.isacariotsystems.MemberSystem.DTO;

import lombok.Data;

@Data
public class SigninRequest {
    private String email;
    private String password;
}
