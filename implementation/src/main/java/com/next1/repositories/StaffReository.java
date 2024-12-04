package repositories;

import entities.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffReository extends JpaRepository<StaffEntity, Integer> {
}
