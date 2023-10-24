package com.isacariotsystems.MemberSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.User;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long>{
    
    public User findManagerByBranchId(Long branchId);

    public String findAddressByBranchId(Long branchId);

    public int findPopulationByBranchId(Long branchId);
}
