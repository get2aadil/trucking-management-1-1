package com.haullog.haullog.models;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "shipments")
public class Shipment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="shipment_id")
	private long shipmentId;

	@Column(name="customer_id")
	private long customerId;
	
	@Column(name="driver_id")
	private long driverId;
	
	@Column(name="truck_id")
	private long truckId;
	
	@Column(name="shipment_cost")
	private long shipmentCost;
	
	@Column(name="shipment_status")
	private String shipmentStatus;
	
	@Column(name="shipment_source")
	private String shipmentSource;
	
	@Column(name="shipment_destination")
	private String shipmentDestination;
	
	@Column(name="creator_id")
	private long creatorId;

	@Column(name="shipment_date")
	private LocalDate shipmentCreatedDate;

	public Shipment() {

	}
	
	public Shipment(long shipmentId, long customerId, long driverId, long truckId, long shipmentCost,
			String shipmentStatus, String shipmentSource, String shipmentDestination, long creatorId, LocalDate shipmentCreatedDate) {
		this.shipmentId = shipmentId;
		this.customerId = customerId;
		this.driverId = driverId;
		this.truckId = truckId;
		this.shipmentCost = shipmentCost;
		this.shipmentStatus = shipmentStatus;
		this.shipmentSource = shipmentSource;
		this.shipmentDestination = shipmentDestination;
		this.creatorId = creatorId;
		this.shipmentCreatedDate = shipmentCreatedDate;
	}
	
	public long getShipmentId() {
		return shipmentId;
	}

	public long getCustomerId() {
		return customerId;
	}

	public long getDriverId() {
		return driverId;
	}

	public long getTruckId() {
		return truckId;
	}

	public long getShipmentCost() {
		return shipmentCost;
	}
	
	public String getShipmentStatus() {
		return shipmentStatus;
	}

	public String getShipmentSource() {
		return shipmentSource;
	}
	
	public String getShipmentDestination() {
		return shipmentDestination;
	}
	
	public LocalDate getShipmentCreatedDate() {
		return shipmentCreatedDate;
	}

	public long getCreatorId() {
		return creatorId;
	}

}
