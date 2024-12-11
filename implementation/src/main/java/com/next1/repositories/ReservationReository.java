package com.next1.repositories;

import com.next1.entities.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationReository extends JpaRepository<ReservationEntity, Integer> {
    boolean existsByVolIdAndSeatNumber(Integer volId, String seatNumber);
}
