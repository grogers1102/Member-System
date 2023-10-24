package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.BranchRepository;

@Service
public class BranchServiceImplementation implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Override
    public Branch saveBranch(Branch branch){
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
    public void deleteBranchById(Long branchId){
        branchRepository.deleteById(branchId);
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
    public User findManagerById(Long branchId){
        return branchRepository.findManagerByBranchId(branchId);
    }

    @Override
    public String findAddressById(Long branchId){
        return branchRepository.findAddressByBranchId(branchId);
    }

    @Override
    public int findPopulationById(Long branchId){
        return branchRepository.findPopulationByBranchId(branchId);
    }


    
}
