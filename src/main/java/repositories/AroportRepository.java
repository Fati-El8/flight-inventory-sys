package repositories;

import entities.AeroportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AroportRepository extends JpaRepository<AeroportEntity, Integer> {
}
