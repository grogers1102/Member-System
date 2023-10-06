package com.isacariotsystems.MemberSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.model.Member;
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

}
