package com.isacariotsystems.MemberSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long>{
    
}
