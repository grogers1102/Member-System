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

import com.isacariotsystems.MemberSystem.entity.Member;
import com.isacariotsystems.MemberSystem.service.MemberService;

@RestController
@RequestMapping("/member")
public class MemberController {
    
    @Autowired
    private MemberService memberService;

    @PostMapping("/add")
    public String add(@RequestBody Member member){
        memberService.saveMember(member);

        return "Sucessfully Added Member";
    }
    
    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers(){
        return new ResponseEntity<List<Member>>(memberService.allMembers(),HttpStatus.OK);
    }

}
