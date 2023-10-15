package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.Optional;

import com.isacariotsystems.MemberSystem.entity.Rank;

public interface RankService {

        
    public Rank saveRank(Rank rank);

    public List<Rank> allRanks();

    public Optional<Rank> findBranchById(Integer rankId);
    
}
