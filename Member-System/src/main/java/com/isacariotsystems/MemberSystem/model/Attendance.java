package com.isacariotsystems.MemberSystem.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.ManyToOne;

import java.util.Date;


@Entity
public class Attendance {
    // Embedded Id indicates our Primary Key is a class
    @EmbeddedId
    private AttendanceID attendanceID;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member member;

    @Column(name = "attendance_date")
    private Date date;

    @Column(name = "isAbsent")
    private boolean isAbsent;

    @Column(name = "isConfirmed")
    private boolean isConfirmed;

}
