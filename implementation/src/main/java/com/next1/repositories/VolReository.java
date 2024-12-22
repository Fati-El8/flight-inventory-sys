package com.next1.repositories;


import com.next1.entities.AeroportEntity;
import com.next1.entities.VolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VolReository extends JpaRepository<VolEntity, Integer> {
    @Query("SELECT v FROM VolEntity v WHERE v.aeroportDepart.nameAeroport = :nameAeroportDepart AND v.aeroportArrive.nameAeroport = :nameAeroportArrive")
    List<VolEntity> findByAeroportsNames(
            @Param("nameAeroportDepart") String nameAeroportDepart,
            @Param("nameAeroportArrive") String nameAeroportArrive
    );}
