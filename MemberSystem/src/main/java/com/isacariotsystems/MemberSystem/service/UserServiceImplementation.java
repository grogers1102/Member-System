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

import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.AttendanceRepository;
import com.isacariotsystems.MemberSystem.repository.BranchRepository;
import com.isacariotsystems.MemberSystem.repository.RankRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private RankRepository rankRepository;

    @Override
    public User saveUser(User user){
        return userRepository.save(user);
    }

    @Override
    public List<User> allUsers(){
        return userRepository.findAll();
    }
    
    @Override
    public Optional<User> findUserById(Long userId){
        return userRepository.findById(userId);
    }

    @Override
    public void deleteUserById(Long userId){
        userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(Long userId, User user){
        if(userRepository.existsById(userId))
        {
            user.setUserId(userId); 
            return userRepository.save(user);
        }
        else
        {
            throw new NoSuchElementException("User " + userId + " not found");
        }
    }

    @Override
    public User updateUserFirstName(Long userId, String firstName){
        if(userRepository.existsById(userId))
        {   
            User user = userRepository.findById(userId).orElseThrow(() -> 
            new NoSuchElementException("User " + userId + " not found"));

            user.setFirstName(firstName); 
            return userRepository.save(user);
        }
        else
        {
            throw new NoSuchElementException("User " + userId + " not found");
        }
    }

    @Override
    public User updateUserLastName(Long userId, String lastName) {
        if (userRepository.existsById(userId)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));
    
            user.setLastName(lastName);
            return userRepository.save(user);
        } else {
            throw new NoSuchElementException("User " + userId + " not found");
        }
    }
    
    @Override
    public User updateUserAddress(Long userId, String address) {
        if (userRepository.existsById(userId)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));
    
            user.setAddress(address);
            return userRepository.save(user);
        } else {
            throw new NoSuchElementException("User " + userId + " not found");
        }
    }
    
    @Override
    public User updateUserPhoneNumber(Long userId, String phoneNumber) {
        if (userRepository.existsById(userId)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));
    
            user.setPhoneNumber(phoneNumber);
            return userRepository.save(user);
        } else {
            throw new NoSuchElementException("User " + userId + " not found");
        }
    }

    @Override
    public User updateUserBranch(Long userId, Long branchId) {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException("User " + userId + " not found");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));

        if (!branchRepository.existsById(branchId)) {
            throw new NoSuchElementException("Branch " + branchId + " not found");
        }

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new NoSuchElementException("Branch " + branchId + " not found"));

        user.setLocalBranch(branch);
        return userRepository.save(user);
    }

    @Override
    public User updateUserRank(Long userId, Long rankId) {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException("User " + userId + " not found");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));

        if (!rankRepository.existsById(rankId)) {
            throw new NoSuchElementException("Rank " + rankId + " not found");
        }

        Rank rank = rankRepository.findById(rankId)
                .orElseThrow(() -> new NoSuchElementException("Rank " + rankId + " not found"));

        user.setRank(rank);
        return userRepository.save(user);
    }

    public User updateUserSuperior(Long userId, Long superiorId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User " + userId + " not found"));

        if (superiorId != null) {
            User superior = userRepository.findById(superiorId)
                    .orElseThrow(() -> new NoSuchElementException("Superior User " + superiorId + " not found"));
            user.setSuperior(superior);
        } else {
            User admin = findUserById(1L).orElse(null);
            user.setSuperior(admin); 
        }

        return userRepository.save(user);
    }
    
    @Override
    public Optional<List<User>> findUsersBySuperiorId(Long superiorId){
        User superiorUser = userRepository.findById(superiorId).orElseThrow(() -> new NoSuchElementException("Superior user not found"));
        List<User> users = userRepository.findBySuperior(superiorUser);
        return Optional.ofNullable(users);
    }

    @Override
    public Optional<List<User>> findUsersByFirstName(String firstName){
        List<User> users = userRepository.findByFirstName(firstName);
        return Optional.ofNullable(users);
    }

    @Override
    public Optional<List<User>> findUsersByBranch(Long branchId){
        List<User> users = userRepository.findByLocalBranchBranchId(branchId);
        return Optional.ofNullable(users);
    }
    
    
    @Override
    public Optional<List<User>> findUsersByRank(Long rankId){
        List<User> users = userRepository.findByRankRankId(rankId);
        return Optional.ofNullable(users);
    }

    @Override
    public Optional<List<User>> findUsersByDate(LocalDate date){
        List<User> users = attendanceRepository.findUsersByAttendanceID_Date(date);
        return Optional.ofNullable(users);
        
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
