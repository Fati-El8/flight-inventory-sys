package com.next1.controllers;

import com.next1.entities.ReservationEntity;
import com.next1.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<ReservationEntity>> getAllReservations() {
        List<ReservationEntity> reservations = reservationService.getallReservation();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    // Récupérer une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<ReservationEntity> getReservationById(@PathVariable Integer id) {
        return reservationService.getReservationById(id)
                .map(reservation -> new ResponseEntity<>(reservation, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<ReservationEntity> saveReservation(@RequestBody ReservationEntity reservation) {
        try {
            ReservationEntity newReservation = reservationService.saveReservation(reservation);
            return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Si les données sont invalides
        }
    }

    // Mettre à jour une réservation existante
    @PutMapping("/{id}")
    public ResponseEntity<ReservationEntity> updateReservation(
            @PathVariable Integer id,
            @RequestBody ReservationEntity reservationDetails) {
        try {
            ReservationEntity updatedReservation = reservationService.updatereservation(id, reservationDetails);
            return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Integer id) {
        try {
            reservationService.deleteReservation(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }
}

