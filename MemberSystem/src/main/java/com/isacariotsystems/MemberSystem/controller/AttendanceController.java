package com.isacariotsystems.MemberSystem.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.AttendanceID;
import com.isacariotsystems.MemberSystem.service.AttendanceService;

/*
 * @RestController: This annotation indicates that the class is a REST controller
 * 
 * @RequestMapping: This annotation is used at the class level to specify the base URL path for the controller
 * 
 * @Autowired: This annotation is used for automatic dependency injection
 */

@RestController
@RequestMapping("api/v1/attendance")
public class AttendanceController {

    @Autowired 
    private AttendanceService attendanceService;

    @PostMapping("/add")
    public String add(@RequestBody Attendance attendance){
        attendanceService.saveAttendance(attendance);

        return "Successfully Added Attendance";
    }


    @PatchMapping("/{userId}/{date}") 
    public Attendance updateAttendanceById(@PathVariable Long userId, @PathVariable LocalDate date, @RequestBody JsonNode requestBody) {
        AttendanceID attendanceId = new AttendanceID(userId, date);
        boolean isConfirmed = requestBody.get("isConfirmed").asBoolean();
        return attendanceService.updateAttendanceIsConfirmed(attendanceId, isConfirmed);
    }

    @GetMapping("/exists/{userId}/{date}")
    public Boolean exists(@PathVariable Long userId, @PathVariable LocalDate date){
        AttendanceID attendanceId = new AttendanceID(userId, date);
        return attendanceService.existsById(attendanceId);
    }

    @GetMapping("/{userId}/all")
    public List<Attendance> findAllAttendanceByUser(@PathVariable Long userId){
        return attendanceService.findAttendanceByUserId(userId).orElse(null);
    }

    @GetMapping("{userId}/all/confirmed")
    public List<Attendance> findAllConfirmedAttendanceByUser(@PathVariable Long userId){
        return attendanceService.getConfirmedAttendanceByUser(userId);
    }

}
