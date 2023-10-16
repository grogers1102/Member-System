package com.isacariotsystems.MemberSystem.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.repository.RankRepository;

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
    public Optional<Rank> findRankById(Integer rankId){
        return rankRepository.findById(rankId);
    }

    @Override
    public void deleteRankById(Integer rankId){
        rankRepository.deleteById(rankId);
    }

    @Override
    public Rank updateRank(Integer rankId, Rank rank){
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
    
}
