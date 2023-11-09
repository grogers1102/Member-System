package com.isacariotsystems.MemberSystem;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.entity.Role;
import com.isacariotsystems.MemberSystem.repository.RankRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

@SpringBootApplication
public class MemberSystemApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RankRepository rankRepository;

    public static void main(String[] args) {
        SpringApplication.run(MemberSystemApplication.class, args);
    }

    @Override
    public void run(String... args) {
        User adminAccount = userRepository.findByRole(Role.ADMIN);
        if (adminAccount == null) {
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setFirstName("admin");
            user.setLastName("admin");
            user.setAddress("admin");
            user.setPhoneNumber("admin");
            user.setRole(Role.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
        }

        Optional<Rank> rankCheck = rankRepository.findById(1L);
        if (!rankCheck.isPresent()) {
            String[] descriptions = {
                "Description 1",
                "Description 2",
                "Description 3",
                "Description 4",
                "Description 5",
                "Description 6",
                "Description 7"
            };
            String[] requirements = {
                "Requirements 1",
                "Requirements 2",
                "Requirements 3",
                "Requirements 4",
                "Requirements 5",
                "Requirements 6",
                "Requirements 7"
            };
            int[] daysRequired = {1, 2, 3, 4, 5, 6, 7};
            for (int i = 0; i < descriptions.length; i++) {
                Rank rank = new Rank();
                rank.setDescription(descriptions[i]);
                rank.setRequirements(requirements[i]);
                rank.setDaysRequired(daysRequired[i]);
                rankRepository.save(rank);
            }
        }
    }
}



