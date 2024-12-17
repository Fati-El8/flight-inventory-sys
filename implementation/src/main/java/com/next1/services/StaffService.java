package com.next1.services;

import com.next1.entities.StaffEntity;
import com.next1.entities.VolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.next1.repositories.StaffReository;
import com.next1.repositories.VolReository;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    public StaffReository staffReository ;

    public List<StaffEntity> getallStaff(){
        return staffReository.findAll();
    }

    public Optional<StaffEntity> getStaffById(Integer id ){
        return staffReository.findById(id);
    }

    public StaffEntity saveStaff(StaffEntity staff){
        return staffReository.save(staff);
    }

    public StaffEntity updateStaff(Integer id, StaffEntity StaffDetails) {
        return staffReository.findById(id)
                .map(vol -> {
                    vol.setName(StaffDetails.getName());
                    vol.setVol(StaffDetails.getVol());
                    vol.setFonction(StaffDetails.getFonction());
                    vol.setOption(StaffDetails.getOption());
                    vol.setNationalite(StaffDetails.getNationalite());
                    vol.setNum_licence(StaffDetails.getNum_licence());
                    return staffReository.save(vol);
                })
                .orElseThrow(() -> new RuntimeException("staff not found with id " + id));
    }

    public void deleteStaff(Integer id) {
        staffReository.deleteById(id);
    }
}
