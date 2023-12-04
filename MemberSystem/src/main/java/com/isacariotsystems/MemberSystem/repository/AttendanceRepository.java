package com.isacariotsystems.MemberSystem.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;
import com.isacariotsystems.MemberSystem.entity.User;


@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,AttendanceID> {

     boolean findIsConfirmedByAttendanceID(AttendanceID attendanceId);

     List<User> findUsersByAttendanceID_Date(LocalDate date);

     List<Attendance> findAttendanceByAttendanceID_UserId(Long userId);

     List<Attendance> findAttendanceByAttendanceID_Date(LocalDate date); 

     boolean findIsAbsentByAttendanceID(AttendanceID attendanceId);


     @Query("SELECT a FROM Attendance a WHERE a.isConfirmed = true AND a.attendanceID.userId = :userId")
     List<Attendance> findAllConfirmedAttendancesForUser(@Param("userId") Long userId);

     @Query("SELECT a FROM Attendance a WHERE a.isConfirmed = false AND a.attendanceID.userId = :userId")
     List<Attendance> findAllUnconfirmedAttendancesForUser(@Param("userId") Long userId);

     void deleteById(AttendanceID attendanceId);
}
