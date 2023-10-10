package com.isacariotsystems.MemberSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Member;
import com.isacariotsystems.MemberSystem.repository.MemberRepository;


@Service
public class MemberServiceImplementation implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public Member saveMember(Member member){
        return memberRepository.save(member);
    }

    @Override
    public List<Member> allMembers(){
        return memberRepository.findAll();
    }
 
}
