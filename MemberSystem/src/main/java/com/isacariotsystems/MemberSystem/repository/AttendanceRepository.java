package com.isacariotsystems.MemberSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;
import com.isacariotsystems.MemberSystem.entity.User;


@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,AttendanceID> {
     List<User> findUsersByAttendanceID_Date(LocalDate date);

     List<Attendance> findAttendanceByAttendanceID_UserId(Long userId);

     List<Attendance> findAttendanceByAttendanceID_Date(LocalDate date); 
}
