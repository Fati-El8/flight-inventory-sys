package services;


import entities.ReservationEntity;
import entities.VolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.ReservationReository;
import repositories.VolReository;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    public ReservationReository reservationReository ;

    public List<ReservationEntity> getallReservation(){
        return reservationReository.findAll();
    }

    public Optional<ReservationEntity> getReservationById(Integer id ){
        return reservationReository.findById(id);
    }

    public ReservationEntity saveReservation(ReservationEntity reservation){
        return reservationReository.save(reservation);
    }

    public ReservationEntity updatereservation(Integer id, ReservationEntity ReservationDetails) {
        return reservationReository.findById(id)
                .map(vol -> {
                    vol.setVol(ReservationDetails.getVol());
                    vol.setPrix(ReservationDetails.getPrix());
                    vol.setSeatNumber(ReservationDetails.getSeatNumber());

                    return reservationReository.save(vol);
                })
                .orElseThrow(() -> new RuntimeException("Vol not found with id " + id));
    }

    public void deleteReservation(Integer id) {
        reservationReository.deleteById(id);
    }
}
