package com.isacariotsystems.MemberSystem;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.entity.Branch;
import com.isacariotsystems.MemberSystem.entity.Rank;
import com.isacariotsystems.MemberSystem.entity.Role;
import com.isacariotsystems.MemberSystem.repository.BranchRepository;
import com.isacariotsystems.MemberSystem.repository.RankRepository;
import com.isacariotsystems.MemberSystem.repository.UserRepository;
import com.isacariotsystems.MemberSystem.service.UserService;

@SpringBootApplication
public class MemberSystemApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RankRepository rankRepository;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(MemberSystemApplication.class, args);
    }

    @Override
    public void run(String... args) {

        makeRanks();

        makeAdmin();

    }

    public void makeAdmin(){
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

            Optional<Rank> optionalRank = rankRepository.findById(1L);
            Rank rank = optionalRank.orElseThrow(() -> new RuntimeException("Rank not found for the provided ID"));
            user.setRank(rank);
            
            userRepository.save(user);
        }
    }

    public void makeRanks(){
        Optional<Rank> rankCheck = rankRepository.findById(1L);
        if (rankCheck.isPresent()) {
            return;
        }
        String[] descriptions = {
            "Novice",
            "Apprentice",
            "Adept",
            "Journeyman",
            "Expert",
            "Master",
            "Grandmaster",
            "Virtuoso"
        };
        String[] requirements = {
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        };
        int[] daysRequired = {1, 3, 5, 5, 7, 7, 7, 7};
        for (int i = 0; i < descriptions.length; i++) {
            Rank rank = new Rank();
            rank.setDescription(descriptions[i]);
            rank.setRequirements(requirements[i]);
            rank.setDaysRequired(daysRequired[i]);
            rankRepository.save(rank);
        }
    }

    public void makeBranch(){

        Optional<Branch> branchCheck = branchRepository.findById(1L);

        if (branchCheck.isPresent()){
            return;
        }

        Branch branch = new Branch();

        User admin = userService.findUserById(1L).orElse(null);

        branch.setManager(admin);
        branch.setName("Los Angeles");
        branch.setAddress("1234 Hollywood Blvd Los Angeles, CA");
        
        branchRepository.save(branch);

        admin.setLocalBranch(branch);
    }

}




