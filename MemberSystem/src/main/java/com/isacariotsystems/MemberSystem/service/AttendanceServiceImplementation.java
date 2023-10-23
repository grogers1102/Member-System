package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;
import com.isacariotsystems.MemberSystem.repository.AttendanceRepository;

@Service
public class AttendanceServiceImplementation implements AttendanceService{

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public Attendance saveAttendance(Attendance attendance){
        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> allAttendance(){
        return attendanceRepository.findAll();
    }

    @Override
    public Optional<Attendance> findAttendanceById(AttendanceID attendanceId){
        return attendanceRepository.findById(attendanceId);
    }

    @Override
    public void deleteAttendanceById(AttendanceID attendanceId){
        attendanceRepository.deleteById(attendanceId);
    }

    @Override
    public Attendance updateAttendance(AttendanceID attendanceId, Attendance attendance){
        if(attendanceRepository.existsById(attendanceId))
        {
            attendance.setAttendanceID(attendanceId); 
            return attendanceRepository.save(attendance);
        }
        else
        {
            throw new NoSuchElementException("Member " + attendanceId + " not found");
        }
    }

    @Override
    public Optional<List<Attendance>> findAttendanceByUserId(Long userId) {
        List<Attendance> attendance = attendanceRepository.findAttendanceByAttendanceID_UserId(userId);
        return Optional.ofNullable(attendance);
        
    }

    @Override
    public Optional<List<Attendance>> findAttendanceByDate(LocalDate date){
        List<Attendance> attendance = attendanceRepository.findAttendanceByAttendanceID_Date(date);
        return Optional.ofNullable(attendance);
    }    
}
