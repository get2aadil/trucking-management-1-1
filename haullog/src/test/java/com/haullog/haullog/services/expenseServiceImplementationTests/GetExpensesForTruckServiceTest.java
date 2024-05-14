package com.haullog.haullog.services.expenseServiceImplementationTests;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.Expense;
import com.haullog.haullog.repository.ExpenseRepository;
import com.haullog.haullog.service.ExpenseServiceImplementation;

@SpringBootTest
public class GetExpensesForTruckServiceTest {
	@Mock
    private ExpenseRepository expenseRepository;
	
	@InjectMocks
	private ExpenseServiceImplementation expenseServiceImplementation;
	
    @BeforeMethod
    public void setUp() {
    	MockitoAnnotations.openMocks(this);
    }
    
    @Test
    public void getExpensesForTruckServiceTest() {
    	
    	Expense expense = new Expense(4, 101, 101, 10, 10000, LocalDate.of(2000, 1, 1), "Diesel refuel");
    	
    	List<Expense> expenses = new ArrayList<> ();
    	
    	expenses.add(expense);
    	
    	when(expenseRepository.findByTruckId(10)).thenReturn(Optional.of(expenses));
    	
    	List<Expense> response = expenseServiceImplementation.getExpensesForTruck(10);
    	
    	assertEquals(response.size(), expenses.size());
    }
}
