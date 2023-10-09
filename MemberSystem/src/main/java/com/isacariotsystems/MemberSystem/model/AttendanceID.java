package com.isacariotsystems.MemberSystem.model;

// Database Imports
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

// Java Imports
import java.io.Serializable;
import java.time.LocalDate;


// Embeddable allows our class to be an attribute of another
@Embeddable
public class AttendanceID implements Serializable {

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "attendance_date")
    private LocalDate date;
}
