package com.next1.services;

import com.next1.entities.AeroportEntity;
import com.next1.entities.VolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.next1.repositories.AroportRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AeroportService {

    @Autowired
    AroportRepository aroportRepository;

    public List<AeroportEntity> getAllAeroports(){
        return aroportRepository.findAll();
    }

    public Optional<AeroportEntity> getAeroportById(Integer id ){
        return aroportRepository.findById(id);
    }

    public AeroportEntity saveAeroport(AeroportEntity aeroport){
        return aroportRepository.save(aeroport);
    }

    public AeroportEntity updateAeroport(Integer id, AeroportEntity AeroportDetails) {
        return aroportRepository.findById(id)
                .map(vol -> {
                    vol.setName_aeroport(AeroportDetails.getName_aeroport());
                    vol.setCapacitie(AeroportDetails.getCapacitie());
                    return aroportRepository.save(vol);
                })
                .orElseThrow(() -> new RuntimeException("Aeroport not found with id " + id));
    }

    public void deleteAeroport(Integer id) {
        aroportRepository.deleteById(id);
    }
}
