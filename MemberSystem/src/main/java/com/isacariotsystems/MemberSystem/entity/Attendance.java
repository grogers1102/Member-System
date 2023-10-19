package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.ManyToOne;

// Lombok Imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {
    // Embedded Id indicates our Primary Key is a class
    @EmbeddedId
    private AttendanceID attendanceID;

    // Specify ManyToOne relationship and Map Foreign Key
    @ManyToOne
    @JoinColumn(name = "memberId", referencedColumnName = "memberId", insertable = false, updatable = false)
    private User member;

    @Column(name = "isAbsent")
    private boolean isAbsent;

    @Column(name = "isConfirmed")
    private boolean isConfirmed;

}

