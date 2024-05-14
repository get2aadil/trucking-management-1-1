package com.haullog.haullog.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

import com.haullog.haullog.models.User;
import com.haullog.haullog.service.UserService;

@RestController
public class LoginController {
	
	private final UserService userService;
	
	public LoginController(UserService userService) {
		this.userService = userService;
	}

	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
		Map<String, String> response = new HashMap<>();

        return userService.getUserByUsername(username)
        		.map(searchedUser -> {
        			if(password.equals(searchedUser.getPassword())) {
        				System.out.println(searchedUser.getUsername() + " logged in");
						response.put("message", "Login Successful");
        				return ResponseEntity.ok(response);
        			} else {
						response.put("message", "Invalid Username or Password");
        				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        	                    .body(response);
        			}
        		})
        		.orElseGet(() -> {
					response.put("message", "User Not Found");
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
				});
    }
	
}
