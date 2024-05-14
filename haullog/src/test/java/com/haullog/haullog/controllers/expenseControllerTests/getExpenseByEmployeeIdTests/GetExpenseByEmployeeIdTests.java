package com.haullog.haullog.controllers.expenseControllerTests.getExpenseByEmployeeIdTests;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.mockito.InjectMocks;
import org.mockito.Mock;
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
public class GetExpenseByEmployeeIdTests {
	@Mock
	private ExpenseService expenseService;
	
	@InjectMocks
    private ExpenseController expenseController;
	
    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
	
	@Test
    public void testGetExpensesForEmployee() {
    	Expense expense = new Expense(4, 101, 101, 10, 10000, LocalDate.of(2000, 1, 1), "Diesel refuel");
    	
    	List<Expense> expenses = new ArrayList<> ();
    	
    	expenses.add(expense);
    	
    	when(expenseService.getExpensesForEmployee(101)).thenReturn(expenses);
    	
    	ResponseEntity<List<Expense>> response = expenseController.getExpensesForEmployee(101);
    	
    	assertEquals(response.getStatusCode(), HttpStatus.OK);
    	assertEquals(response.getBody().size(), 1);
    }
}
