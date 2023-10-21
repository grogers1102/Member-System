package com.isacariotsystems.MemberSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    List<User> findByLocalBranchBranchId(Long branchId);

    List<User> findByRankRankId(Long rankId);
}
