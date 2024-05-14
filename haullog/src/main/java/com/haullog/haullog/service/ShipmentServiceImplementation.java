package com.haullog.haullog.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.haullog.haullog.models.Shipment;
import com.haullog.haullog.repository.ShipmentRepository;

@Service
public class ShipmentServiceImplementation implements ShipmentsService{
	
	@Autowired
    private final ShipmentRepository shipmentRepository;
	
	public ShipmentServiceImplementation(ShipmentRepository shipmentRepository) {
		this.shipmentRepository = shipmentRepository;
	}
	
	@Override
	public List<Shipment> getShipmentsByMonthYear(int month, int year) {

		Optional<List<Shipment>> optionalShipments =  shipmentRepository.findShipmentsByMonthAndYear(month, year);
		
		if(optionalShipments.isPresent()) {
			List<Shipment> shipments = optionalShipments.get().stream()
				    .map(shipment -> new Shipment(
				    		shipment.getShipmentId(),
				            shipment.getCustomerId(), 
				            shipment.getDriverId(), 
				            shipment.getTruckId(), 
				            shipment.getShipmentCost(), 
				            shipment.getShipmentStatus(),
				            shipment.getShipmentSource(), 
				            shipment.getShipmentDestination(), 
				            shipment.getCreatorId(), 
				            shipment.getShipmentCreatedDate()
				        ))
				        .collect(Collectors.toList());
			
			return shipments;
		}

		return new ArrayList<> ();
	}
}