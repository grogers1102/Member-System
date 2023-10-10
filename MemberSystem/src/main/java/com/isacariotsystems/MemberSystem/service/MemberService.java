package com.isacariotsystems.MemberSystem.service;

import java.util.List;

import com.isacariotsystems.MemberSystem.entity.Member;

public interface MemberService {
    public Member saveMember(Member member);

    public List<Member> allMembers();
}
