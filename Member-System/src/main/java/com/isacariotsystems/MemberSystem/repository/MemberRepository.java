package com.isacariotsystems.MemberSystem.repository;

import com.isacariotsystems.MemberSystem.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long>{
    
}
