package com.isacariotsystems.MemberSystem.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.isacariotsystems.MemberSystem.entity.Attendance;
import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

@Service
public class SocialScoreService {

    private static final Logger logger = LoggerFactory.getLogger(SocialScoreService.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceService attendanceService;

    @Scheduled(fixedRate = 60000) 
    public void updateSocialScores() {
        List<User> userList = userService.allUsers();
        for (User user : userList) {
            LocalDate dateJoined = user.getInvitationDate();
            List<Attendance> userAttendances = attendanceService.getConfirmedAttendanceByUser(user.getUserId());

            int daysAttended = userAttendances.size();
            logger.info("daysAttendned"+daysAttended);
            
            long weeksDifference = ChronoUnit.WEEKS.between(dateJoined, LocalDate.now());
            if (weeksDifference > 0 && daysAttended > 0){
                int daysRequiredByRank = user.getRank().getDaysRequired();
            
                Long daysRequired = weeksDifference*daysRequiredByRank;
                logger.info(""+(double)daysAttended/daysRequired);
                user.setSocialScore((double)daysAttended/daysRequired);
                userRepository.save(user);
            }else{
                break;
            }
        }
    }
}
