package com.isacariotsystems.MemberSystem.DTO;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
}
