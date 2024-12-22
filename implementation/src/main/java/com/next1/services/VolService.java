package com.next1.services;


import com.next1.entities.AeroportEntity;
import com.next1.entities.PlaneEntity;
import com.next1.entities.SearchCriteria;
import com.next1.entities.VolEntity;
import com.next1.repositories.PlaneReository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.next1.repositories.VolReository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class VolService {

    @Autowired
    public VolReository volReository ;



    public List<VolEntity> getAllVols(){
        return volReository.findAll();
    }

    public Optional<VolEntity> getVolById(Integer id ){
        return volReository.findById(id);
    }

    public List<VolEntity> searchVols(SearchCriteria criteria) {
        return volReository.findByAeroportsNames(
                criteria.getNameAeroportDepart(),
                criteria.getNameAeroportArrive()
        );
    }
    @Transactional
    public VolEntity saveVol(VolEntity vol) {
        return volReository.save(vol);
    }

    public VolEntity updateVol(Integer id, VolEntity VolDetails) {
        return volReository.findById(id)
                .map(vol -> {
                    vol.setDate_vol(VolDetails.getDate_vol());
                    vol.setNum_vol(VolDetails.getNum_vol());
                    return volReository.save(vol);
                })
                .orElseThrow(() -> new RuntimeException("Vol not found with id " + id));
    }

    public void deleteVol(Integer id) {
        volReository.deleteById(id);
    }
}
