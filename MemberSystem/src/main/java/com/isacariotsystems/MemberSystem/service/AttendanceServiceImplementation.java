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
    public Optional<Attendance> findAttendanceById(AttendanceID attendanceID){
        return attendanceRepository.findById(attendanceID);
    }

    @Override
    public void deleteAttendanceById(AttendanceID attendanceID){
        System.out.println(attendanceID);
        Optional<Attendance> attendance = attendanceRepository.findById(attendanceID);

        attendance.ifPresent(attendanceConfirmed -> {
            attendanceRepository.delete(attendanceConfirmed);
        });
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
    
    @Override
    public boolean findIsAbsentById(AttendanceID attendanceId){
        return attendanceRepository.findIsAbsentByAttendanceID(attendanceId);
    }

    @Override
    public boolean findIsConfirmedById(AttendanceID attendanceId){
        return attendanceRepository.findIsConfirmedByAttendanceID(attendanceId);
    }

    public List<Attendance> getConfirmedAttendanceByUser(Long userId){
        return attendanceRepository.findAllConfirmedAttendancesForUser(userId);
    }

    @Override
    public Attendance updateAttendanceIsConfirmed(AttendanceID attendanceId, boolean isConfirmed){
        if (attendanceRepository.existsById(attendanceId)) {
            Attendance attendance = attendanceRepository.findById(attendanceId).orElse(null);
            attendance.setConfirmed(isConfirmed);
            return attendanceRepository.save(attendance);
        }else{
            throw new NoSuchElementException("User " + attendanceId + " not found");
        }
    }

    @Override
    public Boolean existsById(AttendanceID attendanceId) {
        return attendanceRepository.existsById(attendanceId);
    }
        

}
