package com.haullog.haullog.services.expenseServiceImplementationTests;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.Expense;
import com.haullog.haullog.repository.ExpenseRepository;
import com.haullog.haullog.service.ExpenseServiceImplementation;

@SpringBootTest
public class AddExpenseTest {
	
	@Mock
    private ExpenseRepository expenseRepository;
	
	@InjectMocks
	private ExpenseServiceImplementation expenseServiceImplementation;
	
    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void testAddExpenseServiceSuccess() {
    	
    	Expense expenseFromBody = new Expense(10, 101, 10000, "Diesel refuel");
    	
    	Expense expense = new Expense(4, 101, 101, 10, 10000, LocalDate.of(2000, 1, 1), "Diesel refuel");
    	
    	when(expenseRepository.save(Mockito.any(Expense.class))).thenReturn(expense);
    	
    	Expense response = expenseServiceImplementation.addExpense(expenseFromBody);
    	
    	assertEquals(response.getExpenseId(), expense.getExpenseId());
    }
}
