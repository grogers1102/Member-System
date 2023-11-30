package com.isacariotsystems.MemberSystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.service.BranchService;

/*
 * @RestController: This annotation indicates that the class is a REST controller
 * 
 * @RequestMapping: This annotation is used at the class level to specify the base URL path for the controller
 * 
 * @Autowired: This annotation is used for automatic dependency injection
 */

@RestController
@RequestMapping("/api/v1/branch")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @PostMapping("/add")
    public String add(@RequestBody Branch branch){
        branchService.saveBranch(branch);

        return "Successfully Added Branch";
    }

    @GetMapping("/all")
    public List<Branch> allBranches(){
        return branchService.allBranches();
    }

    @GetMapping("/{branchId}")
    public Optional<Branch> findBranchById(@PathVariable Long branchId){
        return branchService.findBranchById(branchId);
    }

    @DeleteMapping("/{branchId}")
    public void deleteBranchById(@PathVariable Long branchId){
        branchService.deleteBranchById(branchId);
    }

    @PutMapping("/{branchId}")
    public Branch updateBranch(@PathVariable Long branchId, @RequestBody Branch branch){
        return branchService.updateBranch(branchId, branch);
    }

    @PatchMapping("/{branchId}/manager")
    public Branch updateBranchManager(@PathVariable Long branchId, @RequestBody JsonNode requestBody) {
        Long managerId = requestBody.get("managerId").asLong();
        return branchService.updateBranchManager(branchId, managerId);
    }

    @PatchMapping("/{branchId}/name")
    public Branch updateBranchName(@PathVariable Long branchId, @RequestBody JsonNode requestBody) {
        String name = requestBody.get("name").asText();
        return branchService.updateBranchName(branchId, name);
    }

    @PatchMapping("/{branchId}/address")
    public Branch updateBranchAddress(@PathVariable Long branchId, @RequestBody JsonNode requestBody) {
        String address = requestBody.get("address").asText();
        return branchService.updateBranchAddress(branchId, address);
    }


}
