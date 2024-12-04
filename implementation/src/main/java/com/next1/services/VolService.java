package services;


import entities.PlaneEntity;
import entities.VolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.VolReository;

import java.util.List;
import java.util.Optional;

@Service
public class VolService {

    @Autowired
    public VolReository volReository ;

    public List<VolEntity> getallVolls(){
        return volReository.findAll();
    }

    public Optional<VolEntity> getVolById(Integer id ){
        return volReository.findById(id);
    }

    public VolEntity saveVol(VolEntity vol){
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
