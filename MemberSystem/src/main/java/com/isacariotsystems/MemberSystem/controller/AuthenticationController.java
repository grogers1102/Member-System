package com.isacariotsystems.MemberSystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.DTO.JwtAuthenticationResponse;
import com.isacariotsystems.MemberSystem.DTO.RefreshTokenRequest;
import com.isacariotsystems.MemberSystem.DTO.SigninRequest;
import com.isacariotsystems.MemberSystem.DTO.SignupRequest;
import com.isacariotsystems.MemberSystem.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticastionService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignupRequest signupRequest){
        return ResponseEntity.ok(authenticastionService.signup(signupRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest){
        return ResponseEntity.ok(authenticastionService.signin(signinRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticastionService.refreshToken(refreshTokenRequest));
    }


}
