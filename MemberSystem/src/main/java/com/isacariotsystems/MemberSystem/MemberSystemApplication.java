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
            "Rank 0 necessitates that stewards attend at least once weekly, demonstrating their eagerness to learn and commitment to becoming an integral part of the community. This initial step is pivotal for all members, marking a significant period in a steward's journey towards self-discovery and greatness. This stage is crucial for unlocking further opportunities within the organization, signaling the steward's intentions to the leadership.",
            "Bridging the significant gap between Rank 0 and Rank 2, Rank 1 mandates that stewards attend three events per week as outlined in their program, designated by the leaders of the local branch. Advancement to Rank 1 is contingent upon successful completion of Rank 0, as determined by a local branch leader. This phase focuses on applying the diligence instilled during Rank 0, bringing stewards into closer association with seasoned members. Rank 1 often involves rigorous assessment by higher-ranking members to refine the stewards' character.",
            "Rank 2 represents a decisive commitment point. While members are always free to depart, fulfilling this rank's criteria requires adherence to the program established in Rank 1 and earning a reputation for trustworthiness and reliability as judged by a local branch leader. Requirements include attending five days a week.",
            "Rank 3's prerequisites may differ based on the demonstrated skill set and diligence in prior ranks. Rank 3 stewards form the lower echelon of their local school's high leadership, with a commitment of five days per week.",
            "Similar to Rank 3, Rank 4's requirements vary according to the steward's skills and past diligence. Rank 4 stewards take on the role of local branch leaders and are expected to be present seven days a week.",
            "The criteria for Rank 5 also depend on previously exhibited skills and diligence. Typically, Rank 5 stewards function as regional leaders, overseeing multiple branches, with a seven-day-a-week commitment.",
            "As with previous ranks, Rank 6's requirements are contingent on the steward's skill set and demonstrated diligence. Rank 6 stewards often assist Rank 7 stewards in organizing major events and play a pivotal role in the organization. Their commitment is seven days a week.",
            "The prerequisites for Rank 7 vary based on skill and diligence shown in previous ranks. Rank 7 stewards occupy the most influential and critical position in the organization, serving as its head and brain. They are required to be available seven days a week."
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

}




