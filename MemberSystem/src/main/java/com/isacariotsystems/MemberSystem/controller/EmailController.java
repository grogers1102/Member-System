package com.isacariotsystems.MemberSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.isacariotsystems.MemberSystem.service.EmailService;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired 
    private EmailService emailService;

    @GetMapping("/forgotPassword")    
    public void sendForgotPassword(@RequestBody JsonNode requestBody){
        String email = requestBody.get("email").asText();
        emailService.sendForgotPasswordEmail(email);
    }
}
