package com.isacariotsystems.MemberSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long>{

    List<Member> findByLocalBranchBranchId(Long branchId);

    List<Member> findByRankRankId(Long rankId);
    
}
