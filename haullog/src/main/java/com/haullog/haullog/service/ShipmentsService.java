package com.haullog.haullog.service;

import java.util.List;

import com.haullog.haullog.models.Shipment;

public interface ShipmentsService {
	List<Shipment> getShipmentsByMonthYear(int month, int year);
}
