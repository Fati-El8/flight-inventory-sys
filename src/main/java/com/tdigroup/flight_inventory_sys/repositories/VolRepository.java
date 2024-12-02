package com.tdigroup.flight_inventory_sys.repositories;

import com.tdigroup.flight_inventory_sys.entities.VolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolRepository extends JpaRepository<VolEntity, Integer> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
