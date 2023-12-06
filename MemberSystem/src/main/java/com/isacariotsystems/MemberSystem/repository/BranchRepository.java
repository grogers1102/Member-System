package com.isacariotsystems.MemberSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.User;

@Repository
public interface BranchRepository extends JpaRepository<Branch,Long>{
    List<Branch> findBranchesByManager(User manager);
}
