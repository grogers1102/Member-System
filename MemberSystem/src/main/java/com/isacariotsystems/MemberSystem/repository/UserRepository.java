package com.isacariotsystems.MemberSystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.entity.Role;


@Repository
public interface UserRepository extends JpaRepository<User,Long>{

    List<User> findByLocalBranchBranchId(Long branchId);

    List<User> findByRankRankId(Long rankId);

    Optional<User> findByEmail(String email);
    
    User findByRole(Role role);

    List<User> findBySuperior(User user);
}
