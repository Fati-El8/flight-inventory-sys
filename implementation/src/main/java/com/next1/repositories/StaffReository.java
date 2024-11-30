package com.next1.repositories;

import com.next1.entities.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffReository extends JpaRepository<StaffEntity, Integer> {
}
