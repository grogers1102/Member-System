package com.isacariotsystems.MemberSystem.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveMember(user);

        return "Sucessfully Added Member";
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllMembers(){
        return new ResponseEntity<List<User>>(userService.allMembers(),HttpStatus.OK);
    }
    

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi User");
    }

}
