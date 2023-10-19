package com.isacariotsystems.MemberSystem.entity;

// Java Imports
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
public class User implements UserDetails {
    
    @Id // Indicates that this field is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specifies how the primary key is generated
    private Long memberId; // Unique identifier for the member

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
    
    private String email; // Potential Class

    private String phoneNumber; // Potential Class

    private float socialScore; // Potential Class

    private String firstName;

    private String lastName;

    private Role role; 

    private String password;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
       return true;
    }

    @Override
    public boolean isAccountNonLocked() {
       return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
       return true;
    }

    @Override
    public String getPassword() {
        return password;
    }
}

