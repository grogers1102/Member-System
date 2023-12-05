package com.isacariotsystems.MemberSystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
    @Entity maps this entity to DB table
    @Data generates getters and setters
    @AllArgsConstructor generate all arg constructors 
    @NoArgsConstructor generate no arg constructors
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Branch {
    /*
    @Id denotes primary key
    @GeneratedValue defines how we generate Id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long branchId;

    @ManyToOne
    @JoinColumn(name = "managerId", referencedColumnName = "userId")
    @JsonIgnoreProperties("localBranch")
    private User manager;

    private String name;
    
    private String address;
}
