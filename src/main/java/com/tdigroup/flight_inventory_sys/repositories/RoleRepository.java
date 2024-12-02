package com.tdigroup.flight_inventory_sys.repositories;

import com.tdigroup.flight_inventory_sys.entities.ERole;
import com.tdigroup.flight_inventory_sys.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(ERole name);
    boolean existsByName(ERole name);
}
