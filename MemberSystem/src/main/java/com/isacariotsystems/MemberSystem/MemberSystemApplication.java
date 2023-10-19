package com.isacariotsystems.MemberSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.entity.Role;
import com.isacariotsystems.MemberSystem.repository.UserRepository;

@SpringBootApplication
public class MemberSystemApplication implements CommandLineRunner{

	@Autowired
	private UserRepository memberRepository;
	public static void main(String[] args) {
		SpringApplication.run(MemberSystemApplication.class, args);
	}

	public void run(String... args){
		User adminAccount = memberRepository.findByRole(Role.ADMIN);
		if(adminAccount == null){
			User member = new User();

			member.setEmail("admin@gmail.com");
			member.setFirstName("admin");
			member.setLastName("admin");
			member.setRole(Role.ADMIN);
			member.setPassword(new BCryptPasswordEncoder().encode("admin"));
			memberRepository.save(member);
		}
	}

}
