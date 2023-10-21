package com.isacariotsystems.MemberSystem.entity;

// Java Imports
import java.time.LocalDate;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

// Lombok Imports
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
public class User {
    /*
    @Id denotes primary key
    @GeneratedValue defines how we generate Id
     */
    @Id // Indicates that this field is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long userId; 
    /*
    @ManyToOne defines relationship between Member to Branch
    @JoinColumn specifies what attribute is the foreign key
     */
    @ManyToOne
    @JoinColumn(name = "branchId", referencedColumnName = "branchId")
    private Branch localBranch;

    @ManyToOne
    @JoinColumn(name = "superiorId", referencedColumnName = "memberId")
    private User superior;

    @ManyToOne
    @JoinColumn(name= "rankId",referencedColumnName = "rankId")
    private Rank rank;

    private LocalDate invitationDate;
    
    private String email; 

    private String phoneNumber; 

    private float socialScore; 
}

