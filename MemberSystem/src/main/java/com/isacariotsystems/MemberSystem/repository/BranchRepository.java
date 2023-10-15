package com.isacariotsystems.MemberSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Branch;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long>{
    
}
