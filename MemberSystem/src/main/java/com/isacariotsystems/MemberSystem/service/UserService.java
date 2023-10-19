package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.isacariotsystems.MemberSystem.entity.User;

public interface UserService {
    public User saveMember(User member);

    public List<User> allMembers();

    public Optional<User> findMemberById(Long memberId);

    public void deleteMemberById(Long memberId);

    public User updateMember(Long memberId, User member);

    public Optional<List<User>> findMembersByBranch(Long branchId);

    public Optional<List<User>> findMembersByRank(Long rankId);
    
    public Optional<List<User>> findMembersByDate(LocalDate date);

    UserDetailsService userDetailsService();
}
