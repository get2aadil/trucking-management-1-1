package com.haullog.haullog.repository;

import com.haullog.haullog.models.Expense;

//import jakarta.transaction.Transactional;
//
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	
	@Query(nativeQuery = true, value = "SELECT * FROM expenses WHERE :employeeId = employee_id")
    Optional<List<Expense>> findByEmployeeId(long employeeId);
    
    @Query(nativeQuery = true, value = "SELECT * FROM expenses WHERE :truckId = truck_id")
    Optional<List<Expense>> findByTruckId(@Param("truckId") long truckId);
}
