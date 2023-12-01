package com.isacariotsystems.MemberSystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.isacariotsystems.MemberSystem.DTO.RankRequest;
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
    public ResponseEntity<Rank> add(@RequestBody RankRequest rankRequest){
    return ResponseEntity.ok(rankService.saveRank(rankRequest));
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

    @PatchMapping("/{rankId}/name")
    public Rank updateUserByEmail(@PathVariable Long rankId, @RequestBody JsonNode requestBody) {
        String name = requestBody.get("name").asText();
        return rankService.updateRankName(rankId, name);
    }

    @PatchMapping("/{rankId}/description")
    public Rank updateRankDescription(@PathVariable Long rankId, @RequestBody JsonNode requestBody) {
        String description = requestBody.get("description").asText();
        return rankService.updateRankDescription(rankId, description);
    }

    @PatchMapping("/{rankId}/requirements")
    public Rank updateRankRequirements(@PathVariable Long rankId, @RequestBody JsonNode requestBody) {
        String requirements = requestBody.get("requirements").asText();
        return rankService.updateRankRequirements(rankId, requirements);
    }

    @PatchMapping("/{rankId}/daysRequired")
    public Rank updateRankDaysRequired(@PathVariable Long rankId, @RequestBody JsonNode requestBody) {
        int daysRequired = requestBody.get("daysRequired").asInt();
        return rankService.updateRankDaysRequired(rankId, daysRequired);
    }

}
