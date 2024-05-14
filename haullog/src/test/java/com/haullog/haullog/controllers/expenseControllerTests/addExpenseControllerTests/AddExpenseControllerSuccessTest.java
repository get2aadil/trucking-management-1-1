package com.haullog.haullog.controllers.expenseControllerTests.addExpenseControllerTests;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.controllers.ExpenseController;
import com.haullog.haullog.models.Expense;
import com.haullog.haullog.service.ExpenseService;

@SpringBootTest
public class AddExpenseControllerSuccessTest {
	
	@Mock
	private ExpenseService expenseService;
	
	@InjectMocks
    private ExpenseController expenseController;
	
    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void testAddExpenseControllerSuccess() {
    	
    	Expense expenseFromBody = new Expense(10, 101, 10000, "Diesel refuel");
    	
    	Expense expense = new Expense(4, 101, 101, 10, 10000, LocalDate.of(2000, 1, 1), "Diesel refuel");
    	
    	when(expenseService.addExpense(Mockito.any(Expense.class))).thenReturn(expense);
    	
    	ResponseEntity<Object> response = expenseController.addExpense(expenseFromBody);
    	
    	assertEquals(response.getStatusCode(), HttpStatus.OK);
    	assertEquals(response.getBody().toString(), "{expenseId=" + expense.getExpenseId() + "}");
    }
}
