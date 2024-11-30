package com.next1.repositories;

import com.next1.entities.PlaneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneReository extends JpaRepository<PlaneReository, Integer> {
}
