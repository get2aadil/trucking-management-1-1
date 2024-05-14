package com.haullog.haullog.controllers;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.haullog.haullog.models.Shipment;
import com.haullog.haullog.service.ShipmentsService;

@RestController
public class ShipmentController {
	
	@Autowired
	private final ShipmentsService shipmentsService;
	
	public ShipmentController(ShipmentsService shipmentsService) {
		this.shipmentsService = shipmentsService;
	}
	
	@CrossOrigin
	@GetMapping("/getShipmentsByDate/{month}/{year}")
	public ResponseEntity<List<Shipment>> getShipmentsByDate(@PathVariable("month") int month, @PathVariable("year") int year) {
		
		List<Shipment> shipments = new ArrayList<> ();
		
		if(month >= 1 && month <= 12 && year <= YearMonth.now().getYear()) {
			
			if(YearMonth.of(year, month).isBefore(YearMonth.now())) {
				shipments = shipmentsService.getShipmentsByMonthYear(month, year);
				
				return ResponseEntity.ok(shipments); 
			}
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(shipments);
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(shipments);
	}
}
