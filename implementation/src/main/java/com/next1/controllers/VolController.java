package com.next1.controllers;

import com.next1.entities.PlaneEntity;
import com.next1.entities.ReservationEntity;
import com.next1.entities.VolEntity;
import com.next1.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.next1.services.PlaneService;
import com.next1.services.VolService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vols")
public class VolController {

    @Autowired
    private VolService volService;

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<VolEntity>> getAllvols() {
        List<VolEntity> vols = volService.getAllVols();
        return new ResponseEntity<>(vols, HttpStatus.OK);
    }

    // Récupérer une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<VolEntity> getVolById(@PathVariable Integer id) {
        return volService.getVolById(id)
                .map(vol -> new ResponseEntity<>(vol, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<VolEntity> saveVol(@RequestBody VolEntity vol) {
        try {
            VolEntity newVol = volService.saveVol(vol);
            return new ResponseEntity<>(newVol, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Si les données sont invalides
        }
    }

    // Mettre à jour une réservation existante
    @PutMapping("/{id}")
    public ResponseEntity<VolEntity> updateReservation(
            @PathVariable Integer id,
            @RequestBody VolEntity volDetails) {
        try {
            VolEntity updatedVol = volService.updateVol(id, volDetails);
            return new ResponseEntity<>(updatedVol, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVol(@PathVariable Integer id) {
        try {
            volService.deleteVol(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }
}
