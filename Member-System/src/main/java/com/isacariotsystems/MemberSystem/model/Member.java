package com.isacariotsystems.MemberSystem.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


// Entity tells us theres an associated SQL Table
@Entity
public class Member {
    // ID indicates primary key
    // GeneratedValue denotes how our primary key is derived, currently by SQL increment
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
}
