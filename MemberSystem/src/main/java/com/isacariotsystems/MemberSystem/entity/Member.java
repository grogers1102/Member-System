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

@Entity // Indicates that this class is mapped to a database table
@Data // Lombok generates getters and setters for all fields
@AllArgsConstructor // Generates a constructor with all fields
@NoArgsConstructor // Generates a default constructor
public class Member {
    
    @Id // Indicates that this field is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies how the primary key is generated
    private Long memberId; // Unique identifier for the member

    @ManyToOne
    @JoinColumn(name = "branchId", referencedColumnName = "branchId")
    private Branch localBranch;

    @ManyToOne
    @JoinColumn(name = "superiorId", referencedColumnName = "memberId")
    private Member superior;

    @ManyToOne
    @JoinColumn(name= "rankId",referencedColumnName = "rankId")
    private Rank rank;

    private LocalDate invitationDate;
    
    private String email; // Potential Class

    private String phoneNumber; // Potential Class

    private float socialScore; // Potential Class
}

