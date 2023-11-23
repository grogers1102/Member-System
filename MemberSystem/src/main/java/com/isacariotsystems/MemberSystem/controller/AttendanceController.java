package com.isacariotsystems.MemberSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PatchMapping("/{userId}")
    public Attendance updateAttendanceById(@PathVariable AttendanceID attendanceId, @RequestBody JsonNode requestBody) {
        boolean isConfirmed = requestBody.get("isConfirmed").asBoolean();
        return attendanceService.updateAttendanceIsConfirmed(attendanceId, isConfirmed);
    }
}
