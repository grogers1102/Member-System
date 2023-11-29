package com.isacariotsystems.MemberSystem.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
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

     @GetMapping("/all/{firstName}")
    public Optional<List<User>> findUsersByFirstName(@PathVariable String firstName) {
        return userService.findUsersByFirstName(firstName);
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

    @GetMapping("/{superiorId}/all")
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

    @PatchMapping("/{userId}/firstName")
    public User updateUserByFirstName(@PathVariable Long userId, @RequestBody JsonNode requestBody) {
        String firstName = requestBody.get("firstName").asText();
        return userService.updateUserFirstName(userId, firstName);
    }

    @PatchMapping("/{userId}/lastName")
    public User updateUserByLastName(@PathVariable Long userId, @RequestBody JsonNode requestBody) {
        String lastName = requestBody.get("lastName").asText();
        return userService.updateUserFirstName(userId, lastName);
    }

    @PatchMapping("/{userId}/email")
    public User updateUserByEmail(@PathVariable Long userId, @RequestBody JsonNode requestBody) {
        String email = requestBody.get("email").asText();
        return userService.updateUserFirstName(userId, email);
    }

    @PatchMapping("/{userId}/address")
    public User updateUserByAddress(@PathVariable Long userId, @RequestBody JsonNode requestBody) {
        String address = requestBody.get("address").asText();
        return userService.updateUserFirstName(userId, address);
    }

    @PatchMapping("/{userId}/phoneNumber")
    public User updateUserByPhoneNumber(@PathVariable Long userId, @RequestBody JsonNode requestBody) {
        String phoneNumber = requestBody.get("phoneNumber").asText();
        return userService.updateUserPhoneNumber(userId, phoneNumber);
    }

    @PatchMapping("/{userId}/branch")
    public User updateUserByBranch(@PathVariable Long userId, @RequestBody JsonNode requestBody){
        Long branchId = requestBody.get("branchId").asLong();
        return userService.updateUserBranch(userId, branchId);
    }

    @PatchMapping("/{userId}/rank")
    public User updateUserByRank(@PathVariable Long userId, @RequestBody JsonNode requestBody){
        Long rankId = requestBody.get("rankId").asLong();
        return userService.updateUserRank(userId, rankId);
    }

    @PatchMapping("/{userId}/superior")
    public User updateUserBySuperior(@PathVariable Long userId, @RequestBody JsonNode requestBody){
        Long superiorId = requestBody.get("superiorId").asLong();
        return userService.updateUserRank(userId, superiorId);
    }
}
