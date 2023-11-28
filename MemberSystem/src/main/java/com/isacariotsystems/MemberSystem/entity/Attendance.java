package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.EmbeddedId;
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

    @EmbeddedId
    private AttendanceID attendanceID;

    private boolean isConfirmed;
}

