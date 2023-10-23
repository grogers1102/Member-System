package com.isacariotsystems.MemberSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
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
@RequestMapping("api/v1/rank")
public class RankController {
    @Autowired
    private RankService rankService;


    @PostMapping("/add")
    public String add(@RequestBody Rank rank){
        rankService.saveRank(rank);

        return "Successfully Added Rank";
    }
}
