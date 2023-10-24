package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;

public interface AttendanceService {

    public Attendance saveAttendance(Attendance attendance);

    public List<Attendance> allAttendance();

    public Optional<Attendance> findAttendanceById(AttendanceID attendanceId);

    public void deleteAttendanceById(AttendanceID attendanceId);

    public Attendance updateAttendance(AttendanceID attendanceId, Attendance attendance);

    public Optional<List<Attendance>> findAttendanceByUserId(Long userId);

    public Optional<List<Attendance>> findAttendanceByDate(LocalDate date);

    public boolean findIsAbsentById(AttendanceID attendanceId);

    public boolean findIsConfirmedById(AttendanceID attendanceId);

}
