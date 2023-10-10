package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
    private Long member_id; // Unique identifier for the member
}
