package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

    @Override
    public Optional<List<Member>> findMembersByBranch(Long branchId){
        List<Member> members = memberRepository.findByLocalBranchBranchId(branchId);
        return Optional.ofNullable(members);
    }
    
    
    @Override
    public Optional<List<Member>> findMembersByRank(Long rankId){
        List<Member> members = memberRepository.findByRankRankId(rankId);
        return Optional.ofNullable(members);
    }
    
    
    
}
