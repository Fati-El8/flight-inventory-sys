package com.next1.repositories;


import com.next1.entities.VolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolReository extends JpaRepository<VolEntity, Integer> {

}
