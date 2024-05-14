package com.haullog.haullog.models;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "expense_id")
    private long expenseId;

	@Column(name = "reporter_id")
    private long reporterId;

    @Column(name = "employee_id")
    private long employeeId;

    @Column(name = "truck_id")
    private long truckId;

    @Column(name = "cost")
    private long cost;

    @Column(name = "expense_created_date")
    private LocalDate expenseCreatedDate;

    @Column(name = "description")
    private String description;
    
    public Expense() {
	}
    
    public Expense(long truckId, long employeeId, long cost, String description) {
        this.truckId = truckId;
        this.employeeId = employeeId;
        this.cost = cost;
        this.description = description;
        this.reporterId = employeeId;
    }

    public Expense(long expenseId, long reporterId, long employeeId, long truckId, long cost,
			LocalDate expenseCreatedDate, String description) {
		this.expenseId = expenseId;
		this.reporterId = reporterId;
		this.employeeId = employeeId;
		this.truckId = truckId;
		this.cost = cost;
		this.expenseCreatedDate = expenseCreatedDate;
		this.description = description;
	}

    public long getExpenseId() {
        return expenseId;
    }

    public long getTruckId() {
        return truckId;
    }

    public long getEmployeeId() {
        return employeeId;
    }
    
    public long getReporterId() {
        return reporterId;
    }

    public long getCost() {
        return cost;
    }

    public LocalDate getExpenseCreatedDate() {
        return expenseCreatedDate;
    }

    public String getDescription() {
        return description;
    }
    
}

