package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.Optional;

import com.isacariotsystems.MemberSystem.entity.Member;

public interface MemberService {
    public Member saveMember(Member member);

    public List<Member> allMembers();

    public Optional<Member> findMemberById(Long memberId);

    public void deleteMemberById(Long memberId);

    public Member updateMember(Long memberId, Member member);

    //public Optional<List<Member>> findMembersByBranch(Long branchId);

    //public Optional<List<Member>> findMembersByRank(Long rankId);
    
}
