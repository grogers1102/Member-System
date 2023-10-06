package com.isacariotsystems.MemberSystem.model;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Embeddable;


// Embeddable allows our class to be an attribute of another
@Embeddable
public class AttendanceID implements Serializable {

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "attendance_date")
    private LocalDate date;
}
