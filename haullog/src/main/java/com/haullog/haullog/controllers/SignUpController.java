package com.haullog.haullog.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.haullog.haullog.models.User;
import com.haullog.haullog.service.UserService;

@RestController
public class SignUpController {
	private final UserService userService;
	
	public SignUpController(UserService userService) {
		this.userService = userService;
	}
	@CrossOrigin
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody User newUser) {
		if(userService.createNewUser(newUser)) {
			System.out.println("User " + newUser.getFirstName() + ", " + newUser.getLastName() + " from company " + newUser.getCompanyName() + " created");
			return ResponseEntity.ok("User created successfully");
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error occurred during user creation");
		}
    }
}
