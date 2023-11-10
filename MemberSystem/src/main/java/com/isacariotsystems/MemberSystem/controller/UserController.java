package com.isacariotsystems.MemberSystem.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacariotsystems.MemberSystem.entity.User;
import com.isacariotsystems.MemberSystem.service.UserService;

/*
 * @RestController: This annotation indicates that the class is a REST controller
 * 
 * @RequestMapping: This annotation is used at the class level to specify the base URL path for the controller
 * 
 * @Autowired: This annotation is used for automatic dependency injection
 * 
 * @PostMapping: This annotation is used to map HTTP POST requests onto specific handler methods
 *
 * @GetMapping: This annotation is used to map HTTP GET requests onto specific handler methods
 *
 * @DeleteMapping: This annotation is used to map HTTP DELETE requests onto specific handler methods
 *
 * @PutMapping: This annotation is used to map HTTP PUT requests onto specific handler methods
 */

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user) {
        userService.saveUser(user);

        return "Successfully Added Member";
    }

    @GetMapping("/all")
    public List<User> allUsers() {
        return userService.allUsers();
    }

    @GetMapping("/{userId}")
    public Optional<User> findUserById(@PathVariable Long userId) {
        return userService.findUserById(userId);
    }

    @DeleteMapping("/{userId}")
    public String deleteUserById(@PathVariable Long userId) {
        userService.deleteUserById(userId);
        return "User deleted successfully";
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @GetMapping("/all/{managerId}")
    public Optional<List<User>> findUsersBySuperior(@PathVariable Long superiorId) {
        return userService.findUsersBySuperiorId(superiorId);
    }

    @GetMapping("/branch/{branchId}")
    public Optional<List<User>> findUsersByBranch(@PathVariable Long branchId) {
        return userService.findUsersByBranch(branchId);
    }

    @GetMapping("/rank/{rankId}")
    public Optional<List<User>> findUsersByRank(@PathVariable Long rankId) {
        return userService.findUsersByRank(rankId);
    }

    @GetMapping("/date/{date}")
    public Optional<List<User>> findUsersByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return userService.findUsersByDate(date);
    }
}
