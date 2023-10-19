package com.isacariotsystems.MemberSystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    
    @Autowired
    private UserService memberService;

    

    @PostMapping("/add")
    public String add(@RequestBody User member){
        memberService.saveMember(member);

        return "Sucessfully Added Member";
    }
    
    /*@GetMapping
    public ResponseEntity<List<User>> getAllMembers(){
        return new ResponseEntity<List<User>>(memberService.allMembers(),HttpStatus.OK);
    }
    */

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hi User");
    }

}
