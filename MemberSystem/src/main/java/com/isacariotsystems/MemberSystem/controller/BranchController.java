package com.isacariotsystems.MemberSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
}
