package com.haullog.haullog.services.shipmentServiceImplementationTests;

import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;

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
public class GetShipmentsByMonthFailureTest {
	
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
	public void getShipmentsByMonthYearEmpty() {

		when(shipmentRepository.findShipmentsByMonthAndYear(1, 2000)).thenReturn(Optional.empty());
		
		List<Shipment> result  = shipmentsServiceImplementationTests.getShipmentsByMonthYear(1, 2000);
		
		assertEquals(result.size(), 0);
	}
}
