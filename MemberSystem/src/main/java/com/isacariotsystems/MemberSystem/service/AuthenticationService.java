package com.isacariotsystems.MemberSystem.service;

import com.isacariotsystems.MemberSystem.DTO.JwtAuthenticationResponse;
import com.isacariotsystems.MemberSystem.DTO.RefreshTokenRequest;
import com.isacariotsystems.MemberSystem.DTO.SigninRequest;
import com.isacariotsystems.MemberSystem.DTO.SignupRequest;
import com.isacariotsystems.MemberSystem.entity.User;

public interface AuthenticationService {
    User signup(SignupRequest signupRequest);

    JwtAuthenticationResponse signin(SigninRequest signinRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
