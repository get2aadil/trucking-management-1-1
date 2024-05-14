package com.haullog.haullog.services.shipmentServiceImplementationTests;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.haullog.haullog.models.Shipment;
import com.haullog.haullog.repository.ShipmentRepository;
import com.haullog.haullog.service.ShipmentServiceImplementation;

@SpringBootTest
public class GetShipmentsByMonthYearSuccessTest {
	
	@Mock
	@Autowired
    private ShipmentRepository shipmentRepository;
	
	@InjectMocks
	private ShipmentServiceImplementation shipmentsServiceImplementationTests;
	
	@BeforeMethod
    public void setUp() {
		
    	MockitoAnnotations.openMocks(this);
    }
	
	@Test
	public void getShipmentsByMonthYearFound() {
		
		Shipment shipment = new Shipment(103, 203, 303, 700, 0, "In Transit", "C", "D", 403, LocalDate.of(2000, 1, 1));
		
		List<Shipment> shipments = new ArrayList<Shipment> ();
		
		shipments.add(shipment);
		
		when(shipmentRepository.findShipmentsByMonthAndYear(1, 2000)).thenReturn(Optional.of(shipments));

		List<Shipment> result  = shipmentsServiceImplementationTests.getShipmentsByMonthYear(1, 2000);
		
		assertEquals(result.size(), 1);
	}
}
