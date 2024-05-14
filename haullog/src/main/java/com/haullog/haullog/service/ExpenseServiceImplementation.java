package com.haullog.haullog.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.haullog.haullog.repository.ExpenseRepository;
import com.haullog.haullog.models.Expense;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImplementation implements ExpenseService {
	
	@Autowired
    private final ExpenseRepository expenseRepository;
    
    public ExpenseServiceImplementation(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addExpense(Expense expense) {
    	Expense newExpense = expenseRepository.save(expense);
    	
    	return newExpense;
    }

    @Override
    public List<Expense> getExpensesForEmployee(long employeeId) {
    	Optional<List<Expense>> optionalExpenses = expenseRepository.findByEmployeeId(employeeId);
    	
    	if(optionalExpenses.isPresent()) {
    		List<Expense> expenses = optionalExpenses.get().stream()
    				.map(expense -> new Expense(
    						expense.getExpenseId(),
    						expense.getTruckId(),
    						expense.getEmployeeId(),
    						expense.getReporterId(),
    						expense.getCost(),
    						expense.getExpenseCreatedDate(),
    						expense.getDescription()
    						))
    				.collect(Collectors.toList());
    		
    		return expenses;
    	}
    	
    	return new ArrayList<> ();
    }

    @Override
    public List<Expense> getExpensesForTruck(long truckId) {
    	Optional<List<Expense>> optionalExpenses = expenseRepository.findByTruckId(truckId);
    	
    	if(optionalExpenses.isPresent()) {
    		List<Expense> expenses = optionalExpenses.get().stream()
    				.map(expense -> new Expense(
    						expense.getExpenseId(),
    						expense.getTruckId(),
    						expense.getEmployeeId(),
    						expense.getReporterId(),
    						expense.getCost(),
    						expense.getExpenseCreatedDate(),
    						expense.getDescription()
    						))
    				.collect(Collectors.toList());
    		
    		return expenses;
    	}
    	
    	return new ArrayList<> ();
    }
}
