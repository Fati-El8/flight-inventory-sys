package com.tdigroup.flight_inventory_sys.repositories;

import com.tdigroup.flight_inventory_sys.entities.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
}
