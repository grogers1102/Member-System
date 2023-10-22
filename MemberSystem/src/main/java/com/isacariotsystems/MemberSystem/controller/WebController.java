package com.isacariotsystems.MemberSystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index.html"; 
    }
    @GetMapping("/about")
    public String about() {
        return "about.html"; 
    }

    @GetMapping("/ourTeam")
    public String ourTeam() {
        return "ourTeam.html"; 
    }

}

