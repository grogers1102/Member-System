package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.repository.RankRepository;

/*
 * @Service indicates this is a service class
 * 
 * @Autowired automatically wire beans by type
 */

@Service
public class RankServiceImplementation implements RankService {

    @Autowired
    private RankRepository rankRepository;


    @Override
    public Rank saveRank(Rank rank){
        return rankRepository.save(rank);
    }

    @Override
    public List<Rank> allRanks(){
        return rankRepository.findAll();
    }

    @Override
    public Optional<Rank> findRankById(Long rankId){
        return rankRepository.findById(rankId);
    }

    @Override
    public void deleteRankById(Long rankId){
        rankRepository.deleteById(rankId);
    }

    @Override
    public Rank updateRank(Long rankId, Rank rank){
        if(rankRepository.existsById(rankId))
        {
            rank.setRankId(rankId); 
            return rankRepository.save(rank);
        }
        else
        {
            throw new NoSuchElementException("Rank" + rankId + " not found");
        }
    }

    @Override
    public String findDescriptionById(Long rankId){
        return rankRepository.findDescriptionByRankId(rankId);
    }

    @Override
    public String findRequirementsById(Long rankId){
        return rankRepository.findRequirementsByRankId(rankId);
    }

    @Override
    public String findDaysRequiredById(Long rankId){
        return rankRepository.findDaysRequiredByRankId(rankId);
    }
    
}
