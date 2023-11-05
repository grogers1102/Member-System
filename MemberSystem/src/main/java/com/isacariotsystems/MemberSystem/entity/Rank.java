package com.isacariotsystems.MemberSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/*
    @Entity maps this entity to 'ranks' DB table
    @Data generates getters and setters
    @AllArgsConstructor generate all arg constructors 
    @NoArgsConstructor generate no arg constructors
 */
@Entity(name = "ranks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rank {

    public Rank(Long rankId){
        this.rankId=rankId;
    }
    /*
    @Id denotes primary key
    @GeneratedValue defines how we generate Id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rankId;

    private String description;

    private String requirements;
    
    private int daysRequired;
}
