package com.haullog.haullog.services.userServiceImplementation;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.User;
import com.haullog.haullog.repository.UserRepository;
import com.haullog.haullog.service.UserServiceImplementation;

@SpringBootTest
public class GetUserByUsernameFailureTest {

	@Mock
	@Autowired
    private UserRepository userRepository;
	
	User user;
	
	@InjectMocks
	private UserServiceImplementation userServiceImplementation;
	
	@BeforeMethod
    public void setUp() {
		user = new User("abc@email.com", "abc123");
		
    	MockitoAnnotations.openMocks(this);
	}
	
	@Test
	public void createNewUserFailure() {
		when(userRepository.existsById("abc@email.com")).thenReturn(true);
		
		boolean result = userServiceImplementation.createNewUser(user);
		
		assertEquals(result, false);
	}

}
