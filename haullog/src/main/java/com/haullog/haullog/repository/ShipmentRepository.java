package com.haullog.haullog.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.haullog.haullog.models.Shipment;

@Repository
public interface ShipmentRepository extends CrudRepository<Shipment, Long> {
	
	@Query(nativeQuery = true, value = "SELECT * FROM shipments WHERE EXTRACT(YEAR FROM shipment_date) = :year AND EXTRACT(MONTH FROM shipment_date) = :month")// WHERE EXTRACT(YEAR FROM s.shipment_date) = :year AND EXTRACT(MONTH FROM s.shipment_date) = :month;")
    Optional<List<Shipment>> findShipmentsByMonthAndYear(@Param("month") int month, @Param("year") int year);
}