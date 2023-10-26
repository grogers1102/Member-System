package com.isacariotsystems.MemberSystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.service.RankService;

/*
 * @RestController: This annotation indicates that the class is a REST controller
 * 
 * @RequestMapping: This annotation is used at the class level to specify the base URL path for the controller
 * 
 * @Autowired: This annotation is used for automatic dependency injection
 */

@RestController
@RequestMapping("api/v1/ranks")
public class RankController {
    @Autowired
    private RankService rankService;


    @PostMapping("/add")
    public String add(@RequestBody Rank rank){
        rankService.saveRank(rank);

        return "Successfully Added Rank";
    }

    @GetMapping("/all")
    public List<Rank> allRanks(){
        return rankService.allRanks();
    }

    @GetMapping("/{rankId}")
    public Optional<Rank> getRankById(@PathVariable Long rankId){
        return rankService.findRankById(rankId);
    }

    @DeleteMapping("/{rankId}")
    public void deleteRankById(@PathVariable Long rankId){
        rankService.deleteRankById(rankId);
    }

    @PutMapping("/{rankId}")
    public Rank updateRankById(@PathVariable Long rankId,@RequestBody Rank rank){
        return rankService.updateRank(rankId,rank);
    }

    @GetMapping("/{rankId}/description")
    public String findRankDescriptionById(@PathVariable Long rankId){
        return rankService.findDescriptionById(rankId);
    }

    @GetMapping("/{rankId}/requirements")
    public String findRankRequirementsById(@PathVariable Long rankId){
        return rankService.findRequirementsById(rankId);
    }

    @GetMapping("/{rankId}/daysRequired")
    public String findRankDaysRequiredById(@PathVariable Long rankId){
        return rankService.findDaysRequiredById(rankId);
    }
}
