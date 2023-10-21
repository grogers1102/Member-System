package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.AttendanceRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository memberRepository;

    private AttendanceRepository attendanceRepository;

    @Override
    public User saveMember(User member){
        return memberRepository.save(member);
    }

    @Override
    public List<User> allMembers(){
        return memberRepository.findAll();
    }
    
    @Override
    public Optional<User> findMemberById(Long memberId){
        return memberRepository.findById(memberId);
    }

    @Override
    public void deleteMemberById(Long memberId){
        memberRepository.deleteById(memberId);
    }

    @Override
    public User updateMember(Long memberId, User member){
        if(memberRepository.existsById(memberId))
        {
            member.setUserId(memberId); 
            return memberRepository.save(member);
        }
        else
        {
            throw new NoSuchElementException("Member " + memberId + " not found");
        }
    }

    @Override
    public Optional<List<User>> findMembersByBranch(Long branchId){
        List<User> members = memberRepository.findByLocalBranchBranchId(branchId);
        return Optional.ofNullable(members);
    }
    
    
    @Override
    public Optional<List<User>> findMembersByRank(Long rankId){
        List<User> members = memberRepository.findByRankRankId(rankId);
        return Optional.ofNullable(members);
    }

    @Override
    public Optional<List<User>> findMembersByDate(LocalDate date) {
        List<User> members = attendanceRepository.findMembersByAttendanceID_Date(date);
        return Optional.ofNullable(members);
        
    }
    
    
    
}
