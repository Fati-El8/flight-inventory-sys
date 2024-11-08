package repositories;

import entities.PlaneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneReository extends JpaRepository<PlaneReository, Integer> {
}
