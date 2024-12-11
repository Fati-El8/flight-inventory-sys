package com.next1.services;


import com.next1.entities.PlaneEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.next1.repositories.PlaneReository;

import java.util.List;
import java.util.Optional;

@Service
public class PlaneService {

    @Autowired
    private PlaneReository planeReository ;


    public Optional<PlaneEntity> getPlaneById(Integer id) {
            return planeReository.findById(id);
        }

    public List<PlaneEntity> getAllplanes() {
        return planeReository.findAll();
    }

    public PlaneEntity savePlane(PlaneEntity plane){
        return planeReository.save(plane);
    }

    public PlaneEntity updatePlane(Integer id, PlaneEntity planeDetails) {
        return  planeReository.findById(id)
                .map(plane -> {
                    plane.setCapacity(planeDetails.getCapacity());

                    return savePlane(planeDetails);
                })
                .orElseThrow(() -> new RuntimeException("Plane not found with id " + id));

    }

    public void deletePlane(Integer id) {
        planeReository.deleteById(id);
    }
}
