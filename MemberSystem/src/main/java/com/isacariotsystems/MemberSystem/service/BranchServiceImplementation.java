package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.DTO.BranchRequest;
import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.Role;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.BranchRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

@Service
public class BranchServiceImplementation implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private UserService userService;

    @Override
    public Branch saveBranch(BranchRequest branchRequest) {
        Branch branch = new Branch();
        branch.setAddress(branchRequest.getAddress());
        branch.setName(branchRequest.getName());

        User branchManager = userRepository.findByRole(Role.ADMIN);

        try {
            if (branchManager != null) {
                branch.setManager(branchManager);
            } else {

            }
        } catch (Error e) {
            e.printStackTrace(); 
        }

        return branchRepository.save(branch);
    }


    @Override
    public List<Branch> allBranches(){
        return branchRepository.findAll();
    }
    
    @Override
    public Optional<Branch> findBranchById(Long branchId){
        return branchRepository.findById(branchId);
    }

    @Override
    public void deleteBranchById(Long branchId) {
        Optional<Branch> optionalBranch = branchRepository.findById(branchId);
        
        optionalBranch.ifPresent(branch -> {
            branch.setManager(null);
            
            branchRepository.save(branch);

            Optional<List<User>> optionalUser = userService.findUsersByBranch(branchId);

            optionalUser.ifPresent(users -> {
                for (User user : users) {
                    user.setLocalBranch(null);
                    userRepository.save(user);
                }
            });
            branchRepository.deleteById(branchId);
        });
    }


    @Override
    public Branch updateBranch(Long branchId, Branch branch){
        if(branchRepository.existsById(branchId))
        {
            branch.setBranchId(branchId); 
            return branchRepository.save(branch);
        }
        else
        {
            throw new NoSuchElementException("Branch " + branchId + " not found");
        }
    }

    @Override
    public Branch updateBranchName(Long branchId, String name) {
        if (branchRepository.existsById(branchId)) {
            Branch branch = branchRepository.findById(branchId)
                    .orElseThrow(() -> new NoSuchElementException("Branch " + branchId + " not found"));

            branch.setName(name);

            return branchRepository.save(branch);
        } else {
            throw new NoSuchElementException("Branch " + branchId + " not found");
        }
    }

    @Override
    public Branch updateBranchAddress(Long branchId, String address) {
        if (branchRepository.existsById(branchId)) {
            Branch branch = branchRepository.findById(branchId)
                    .orElseThrow(() -> new NoSuchElementException("Branch " + branchId + " not found"));

            branch.setAddress(address);

            return branchRepository.save(branch);
        } else {
            throw new NoSuchElementException("Branch " + branchId + " not found");
        }
    }

    @Override
    public Branch updateBranchManager(Long branchId, Long managerId) {
        if (branchRepository.existsById(branchId)) {
            Branch branch = branchRepository.findById(branchId)
                    .orElseThrow(() -> new NoSuchElementException("Branch " + branchId + " not found"));
            User manager = userRepository.findById(managerId)
                    .orElseThrow(() -> new NoSuchElementException("Branch " + branchId + " not found"));
                
            branch.setManager(manager);

            return branchRepository.save(branch);
        } else {
            throw new NoSuchElementException("Branch " + branchId + " not found");
        }
    }

}
