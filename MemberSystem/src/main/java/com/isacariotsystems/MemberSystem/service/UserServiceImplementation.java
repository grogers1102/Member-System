package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.AttendanceRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    private AttendanceRepository attendanceRepository;

    @Override
    public User saveMember(User member){
        return userRepository.save(member);
    }

    @Override
    public List<User> allMembers(){
        return userRepository.findAll();
    }
    
    @Override
    public Optional<User> findMemberById(Long memberId){
        return userRepository.findById(memberId);
    }

    @Override
    public void deleteMemberById(Long memberId){
        userRepository.deleteById(memberId);
    }

    @Override
    public User updateMember(Long memberId, User member){
        if(userRepository.existsById(memberId))
        {
            member.setUserId(memberId); 
            return userRepository.save(member);
        }
        else
        {
            throw new NoSuchElementException("Member " + memberId + " not found");
        }
    }

    @Override
    public Optional<List<User>> findMembersByBranch(Long branchId){
        List<User> members = userRepository.findByLocalBranchBranchId(branchId);
        return Optional.ofNullable(members);
    }
    
    
    @Override
    public Optional<List<User>> findMembersByRank(Long rankId){
        List<User> members = userRepository.findByRankRankId(rankId);
        return Optional.ofNullable(members);
    }

    @Override
    public Optional<List<User>> findMembersByDate(LocalDate date) {
        List<User> members = attendanceRepository.findMembersByAttendanceID_Date(date);
        return Optional.ofNullable(members);
        
    }

    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService(){
            @Override
            public UserDetails loadUserByUsername(String username){
                return userRepository.findByEmail(username)
                    .orElseThrow(()-> new UsernameNotFoundException("Username not found"));
            }
        };
    }
    
    
    
}
