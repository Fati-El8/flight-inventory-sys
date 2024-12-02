package com.tdigroup.flight_inventory_sys.repositories;

import com.tdigroup.flight_inventory_sys.entities.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}
