package com.isacariotsystems.MemberSystem.entity;

// Database Imports
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

// Java Imports
import java.io.Serializable;
import java.time.LocalDate;


// Embeddable allows our class to be an attribute of another
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class AttendanceID implements Serializable {

    @Column(name = "memberId")
    private Long member_id;

    @Column(name = "attendance_date")
    private LocalDate date;
}
