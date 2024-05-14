package com.haullog.haullog.controllers;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.Shipment;
import com.haullog.haullog.service.ShipmentsService;

@SpringBootTest
public class ShipmentControllerTests {
	@Mock
	@Autowired
    private ShipmentsService shipmentsService;
	
	@Mock
	Shipment shipment;
	
	@Mock
	List<Shipment> shipments;
	
	@InjectMocks
	private ShipmentController shipmentController;
	
	@BeforeMethod
    public void setUp() {
		
		shipment = new Shipment(103, 203, 303, 700, 0, "In Transit", "C", "D", 403, LocalDate.of(2000, 1, 1));
		
		shipments = new ArrayList<Shipment> ();
		
		shipments.add(shipment);
		
    	MockitoAnnotations.openMocks(this);
    }
	
	@Test
    public void testGetShipmentsByDateSuccess() {
		
		when(shipmentsService.getShipmentsByMonthYear(1, 2000)).thenReturn(shipments);
		
		ResponseEntity<List<Shipment>> response = shipmentController.getShipmentsByDate(1, 2000);
		
		assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody(), shipments);
	}
	
	@Test
	public void testGetShipmentsByDateMonthError() {
		
		when(shipmentsService.getShipmentsByMonthYear(15, 2000)).thenReturn(new ArrayList<> ());
		
		ResponseEntity<List<Shipment>> response = shipmentController.getShipmentsByDate(15, 2000);
		
		assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);
        assertEquals(response.getBody(), new ArrayList<> ());
	}
	
	@Test
	public void testGetShipmentsByDateInFutureError() {
		
		when(shipmentsService.getShipmentsByMonthYear(15, 3000)).thenReturn(new ArrayList<> ());
		
		ResponseEntity<List<Shipment>> response = shipmentController.getShipmentsByDate(15, 2000);
		
		assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);
        assertEquals(response.getBody(), new ArrayList<> ());
	}
}
