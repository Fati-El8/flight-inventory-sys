package com.next1.repositories;

import com.next1.entities.ReservationEntity;
import com.next1.entities.VolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface     ReservationRepository extends JpaRepository<ReservationEntity, Integer> {

      boolean existsByVolAndSeatNumber(VolEntity vol, String seatNumber);


}
