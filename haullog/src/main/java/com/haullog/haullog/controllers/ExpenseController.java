package com.haullog.haullog.controllers;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.haullog.haullog.models.Expense;
import com.haullog.haullog.service.ExpenseService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<Object> addExpense(@RequestBody Expense expense) {

        Expense addedExpense = new Expense(expense.getTruckId(), expense.getEmployeeId(), expense.getCost(), expense.getDescription());

        Expense savedExpense = expenseService.addExpense(addedExpense);

        Map<String, Long> response = new HashMap<>();
        response.put("expenseId", savedExpense.getExpenseId());

        return ResponseEntity.ok(response);
    }

    @CrossOrigin
    @GetMapping("/driver/{employeeId}")
    public ResponseEntity<List<Expense>> getExpensesForEmployee(@PathVariable long employeeId) {
    	List<Expense> expenses = expenseService.getExpensesForEmployee(employeeId);
        
        return ResponseEntity.ok(expenses);
    }

    @CrossOrigin
    @GetMapping("/truck/{truckId}")
    public ResponseEntity<List<Expense>> getExpensesForTruck(@PathVariable long truckId) {
    	
        List<Expense> expenses = expenseService.getExpensesForTruck(truckId);
        
        return ResponseEntity.ok(expenses);
    }
}
