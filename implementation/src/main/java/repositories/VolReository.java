package repositories;

import entities.VolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolReository extends JpaRepository<VolEntity, Integer> {
}
