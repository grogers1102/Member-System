package com.isacariotsystems.MemberSystem.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class MainController {
    
    @GetMapping("/")
    public String index() {
        return "index"; 
    }

    @GetMapping("/")
    public String about() {
        return "about"; 
    }

    @GetMapping("/")
    public String ourTeam() {
        return "ourTeam"; 
    }

    @GetMapping("/")
    public String login() {
        return "login"; 
    }
}
