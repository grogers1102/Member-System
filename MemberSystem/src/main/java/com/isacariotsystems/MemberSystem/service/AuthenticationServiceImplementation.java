 package com.isacariotsystems.MemberSystem.service;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.DTO.ChangePasswordRequest;
import com.isacariotsystems.MemberSystem.DTO.JwtAuthenticationResponse;
import com.isacariotsystems.MemberSystem.DTO.RefreshTokenRequest;
import com.isacariotsystems.MemberSystem.DTO.SigninRequest;
import com.isacariotsystems.MemberSystem.DTO.SignupRequest;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.entity.Role;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImplementation implements AuthenticationService{
    
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final BranchService branchService;

    private final RankService rankService;

    private final UserService userService;

    private final JWTService jwtService;

    public String changePassword(ChangePasswordRequest changePasswordRequest) {
        User user = userService.findUserById(changePasswordRequest.getUserId())
                              .orElseThrow(() -> new IllegalArgumentException("Invalid User"));
    
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), changePasswordRequest.getOldPassword()));
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Invalid old password");
        }
    
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userService.saveUser(user);
    
        return "Password Saved Sucessfully";
    }
    

    public JwtAuthenticationResponse signup(SignupRequest signupRequest){
        User user = new User();

        String email = signupRequest.getEmail();
        String password = signupRequest.getPassword();

        user.setEmail(email);
        user.setLastName(signupRequest.getLastName());
        user.setFirstName(signupRequest.getFirstName());
        user.setAddress(signupRequest.getAddress());
        user.setPhoneNumber(signupRequest.getPhoneNumber());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(password));

        Branch branch = branchService.findBranchById(1L).orElse(null);
        user.setLocalBranch(branch);

        Rank rank = rankService.findRankById(1L).orElse(null);
        user.setRank(rank);

        user.setSocialScore(0.1);
        
        User superior = userService.findUserById(1L).orElse(null);
        user.setSuperior(superior);


        userRepository.save(user); 
        SigninRequest signin = new SigninRequest();
        signin.setEmail(email);
        signin.setPassword(password);
        return signin(signin);
    }
    public JwtAuthenticationResponse signin(SigninRequest signinRequest){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword()));

        var user = userRepository.findByEmail(signinRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid Email or Password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);


        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        jwtAuthenticationResponse.setUserId(user.getUserId());
        return jwtAuthenticationResponse;
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            var jwt = jwtService.generateToken(user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());
            return jwtAuthenticationResponse;
        }
        return null;
     

    }
    
}
