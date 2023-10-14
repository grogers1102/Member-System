package com.isacariotsystems.MemberSystem.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {
    
    @GetMapping("/index")
    public String index() {
        return "index"; 
    }

    @GetMapping("/about")
    public String about() {
        return "about"; 
    }

    @GetMapping("/ourTeam")
    public String ourTeam() {
        return "ourTeam"; 
    }

    @GetMapping("/login")
    public String login() {
        return "login"; 
    }
}
