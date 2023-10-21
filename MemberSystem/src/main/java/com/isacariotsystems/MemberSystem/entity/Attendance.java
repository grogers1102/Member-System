package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.ManyToOne;

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
public class Attendance {

       /*
    @EmbeddedId indicates primary key is an embedded entity
    @ManyToOne defines relationship between Member to Branch
    @JoinColumn specifies what attribute is the foreign key
    */
    @EmbeddedId
    private AttendanceID attendanceID;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", insertable = false, updatable = false)
    private User user;

    private boolean isAbsent;

    private boolean isConfirmed;

}

