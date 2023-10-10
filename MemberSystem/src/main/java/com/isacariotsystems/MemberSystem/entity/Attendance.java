package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Lombok Imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Java Imports
import java.time.LocalDate;


@Entity
@Table(name="ATTENDANCE")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {
    // Embedded Id indicates our Primary Key is a class
    @EmbeddedId
    private AttendanceID attendanceID;

    // Specify ManyToOne relationship and Map Foreign Key
    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member member;

    private LocalDate date;

    @Column(name = "isAbsent")
    private boolean isAbsent;

    @Column(name = "isConfirmed")
    private boolean isConfirmed;

}

