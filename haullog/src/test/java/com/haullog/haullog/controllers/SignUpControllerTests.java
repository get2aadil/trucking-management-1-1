package com.haullog.haullog.controllers;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.User;
import com.haullog.haullog.service.UserService;

@SpringBootTest
public class SignUpControllerTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private SignUpController controller;

    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void testSignUpSuccess() {
    	User mockUser = new User("john@email.com", "john123", "John", "Doe", "Fake Company");
    	
    	when(userService.createNewUser(mockUser)).thenReturn(true);
    	
    	ResponseEntity<String> response = controller.signUp(mockUser);
    	
    	assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody(), "User created successfully");
    }
    
    @Test
    public void testSignUpUserAlreadyExists() {
    	User mockUser = new User("john@email.com", "john123", "John", "Doe", "Fake Company");
    	
    	when(userService.createNewUser(mockUser)).thenReturn(false);
    	
    	ResponseEntity<String> response = controller.signUp(mockUser);
    	
    	assertEquals(response.getStatusCode(), HttpStatus.CONFLICT);
        assertEquals(response.getBody(), "Error occurred during user creation");
    }
}
