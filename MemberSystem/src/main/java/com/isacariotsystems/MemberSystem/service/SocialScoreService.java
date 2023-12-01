package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.User;

@Service
public class SocialScoreService {

    private static final Logger logger = LoggerFactory.getLogger(SocialScoreService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AttendanceService attendanceService;

    @Scheduled(fixedRate = 60000) 
    public void updateSocialScores() {
        List<User> userList = userService.allUsers();
        logger.info("Updating social scores...");
        for (User user : userList) {
            LocalDate dateJoined = user.getInvitationDate();
            Optional<List<Attendance>> userAttendances = attendanceService.findAttendanceByUserId(user.getUserId());

            int daysAttended = 0;

            if (userAttendances.isPresent()) {
                List<Attendance> attendanceList = userAttendances.get();

                for (Attendance attendance : attendanceList) {
                    if (attendance.isConfirmed()) {
                        daysAttended++;
                    }
                }
            }
            
            long weeksDifference = ChronoUnit.WEEKS.between(dateJoined, LocalDate.now());

            int daysRequiredByRank = user.getRank().getDaysRequired();

            Long daysRequired = weeksDifference*daysRequiredByRank;

            user.setSocialScore(daysAttended/daysRequired);
        }
    }
}
