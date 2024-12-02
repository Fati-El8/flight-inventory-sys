package com.tdigroup.flight_inventory_sys.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tdigroup.flight_inventory_sys.entities.AeroportEntity;

@Repository
public interface AeroportRepository extends JpaRepository<AeroportEntity, Integer> {

}
