package com.haullog.haullog.controllers;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.User;
import com.haullog.haullog.service.UserService;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@SpringBootTest
public class LoginControllerTests {
	
    @Mock
    private UserService userService;

    @InjectMocks
    private LoginController controller;

    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void testLoginSuccess() {
    	
    	User mockUser = new User("abc@email.com", "abc123");
        when(userService.getUserByUsername(mockUser.getUsername())).thenReturn(Optional.of(mockUser));

        ResponseEntity<String> response = controller.login(mockUser);

        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody(), "Login successful");
    }

    @Test
    public void testLoginWrongPassword() {
    	User mockUser = new User("abc@email.com", "abc123");
        when(userService.getUserByUsername("abc@email.com")).thenReturn(Optional.of(mockUser));

        ResponseEntity<String> response = controller.login(new User("abc@email.com", "wrongPassword"));

        assertEquals(response.getStatusCode(), HttpStatus.UNAUTHORIZED);
        assertEquals(response.getBody(), "Invalid username or password");
    }

    @Test
    public void testLoginUserNotFound() {
    	User mockUser = new User("usernotexist@email.com", "abc123");
        when(userService.getUserByUsername("usernotexist@email.com")).thenReturn(Optional.empty());

        ResponseEntity<String> response = controller.login(mockUser);
    	
        assertEquals(response.getStatusCode(), HttpStatus.UNAUTHORIZED);
        assertEquals(response.getBody(), "User not found");
    }
}