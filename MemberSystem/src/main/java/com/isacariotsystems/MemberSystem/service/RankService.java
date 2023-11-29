package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.Optional;

import com.isacariotsystems.MemberSystem.entity.Rank;

public interface RankService {

    public Rank saveRank(Rank rank);

    public List<Rank> allRanks();

    public Optional<Rank> findRankById(Long rankId);

    public void deleteRankById(Long rankId);

    public Rank updateRank(Long rankId, Rank rank);

    public String findDescriptionById(Long rankId);

    public String findRequirementsById(Long rankId);

    public String findDaysRequiredById(Long rankId);

    public Rank updateRankDaysRequired(Long rankId, int daysRequired);

    public Rank updateRankRequirements(Long rankId, String requirements);

    public Rank updateRankDescription(Long rankId, String description);

    public Rank updateRankName(Long rankId, String name);
}
