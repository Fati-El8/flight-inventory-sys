package repositories;

import entities.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationReository extends JpaRepository<ReservationEntity, Integer> {
}
