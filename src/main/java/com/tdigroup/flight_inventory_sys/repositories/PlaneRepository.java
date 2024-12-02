package com.tdigroup.flight_inventory_sys.repositories;

import com.tdigroup.flight_inventory_sys.entities.PlaneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneRepository extends JpaRepository<PlaneEntity, Integer> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
}
