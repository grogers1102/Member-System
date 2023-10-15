package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.Member;
import com.isacariotsystems.MemberSystem.repository.BranchRepository;
import com.isacariotsystems.MemberSystem.repository.MemberRepository;
import com.isacariotsystems.MemberSystem.repository.RankRepository;


@Service
public class MemberServiceImplementation implements MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private RankRepository rankRepository;

    @Override
    public Member saveMember(Member member){
        return memberRepository.save(member);
    }

    @Override
    public List<Member> allMembers(){
        return memberRepository.findAll();
    }
    
    @Override
    public Optional<Member> findMemberById(Long memberId){
        return memberRepository.findById(memberId);
    }

    @Override
    public void deleteMemberById(Long memberId){
        memberRepository.deleteById(memberId);
    }

    @Override
    public Member updateMember(Long memberId, Member member){
        if(memberRepository.existsById(memberId))
        {
            member.setMemberId(memberId); 
            return memberRepository.save(member);
        }
        else
        {
            throw new NoSuchElementException("Member " + memberId + " not found");
        }
    }
}
