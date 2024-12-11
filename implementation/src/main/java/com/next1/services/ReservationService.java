package com.next1.services;


import com.next1.entities.ReservationEntity;
import com.next1.entities.VolEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.next1.repositories.ReservationReository;
import com.next1.repositories.VolReository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private VolReository volRepository;

    @Autowired
    public ReservationReository reservationReository ;

    public List<ReservationEntity> getallReservation(){
        return reservationReository.findAll();
    }

    public Optional<ReservationEntity> getReservationById(Integer id ){
        return reservationReository.findById(id);
    }

    @Transactional
    public ReservationEntity saveReservation(ReservationEntity reservation) {
        // Vérifier si le vol existe
        VolEntity vol = volRepository.findById(reservation.getVol().getId_vol())
                .orElseThrow(() -> new IllegalArgumentException("Le vol n'existe pas"));

        // Vérifier la disponibilité du siège
        boolean seatExists = reservationReository.existsByVolIdAndSeatNumber(reservation.getVol().getId_vol(), reservation.getSeatNumber());
        if (seatExists) {
            throw new IllegalArgumentException("Le siège est déjà réservé.");
        }

        // Créer et enregistrer la réservation
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
