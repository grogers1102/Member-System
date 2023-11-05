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
public class User implements UserDetails {
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
    @JoinColumn(name = "superiorId", referencedColumnName = "userId")
    private User superior;

    @ManyToOne
    @JoinColumn(name= "rankId",referencedColumnName = "rankId")
    private Rank rank;

    private LocalDate invitationDate;
    
    private String email; 

    private String phoneNumber; 

    private String address;

    private float socialScore; 

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

