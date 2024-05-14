package com.haullog.haullog.service;

import com.haullog.haullog.models.Expense;

import java.util.List;

public interface ExpenseService {
    
    Expense addExpense(Expense expense);

    List<Expense> getExpensesForEmployee(long employeeId);
    
    List<Expense> getExpensesForTruck(long truckId);

}
