package com.next1.repositories;

import com.next1.entities.AeroportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AroportRepository extends JpaRepository<AeroportEntity, Integer> {
    AeroportEntity findByNameAeroport(String nameaeroport);
}
