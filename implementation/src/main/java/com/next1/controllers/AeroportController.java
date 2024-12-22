package com.next1.controllers;

import com.next1.entities.AeroportEntity;
import com.next1.entities.PlaneEntity;
import com.next1.entities.ReservationEntity;
import com.next1.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.next1.services.AeroportService;
import com.next1.services.PlaneService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Aeroports")
public class AeroportController {
    @Autowired
    private AeroportService aeroportService;

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<AeroportEntity>> getAllAeroports() {
        List<AeroportEntity> aeroport = aeroportService.getAllAeroports();
        return new ResponseEntity<>(aeroport, HttpStatus.OK);
    }

    // Récupérer une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<AeroportEntity> getaeroportsById(@PathVariable Integer id) {
        return aeroportService.getAeroportById(id)
                .map(aeroport -> new ResponseEntity<>(aeroport, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<AeroportEntity> saveaeroport(@RequestBody AeroportEntity aeroport) {
        try {
            AeroportEntity newAeroport = aeroportService.saveAeroport(aeroport);
            return new ResponseEntity<>(newAeroport, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Si les données sont invalides
        }
    }

    // Mettre à jour une réservation existante
    @PutMapping("/{id}")
    public ResponseEntity<AeroportEntity> updateReservation(
            @PathVariable Integer id,
            @RequestBody AeroportEntity aeroportDetails) {
        try {
            AeroportEntity updatedAeroport = aeroportService.updateAeroport(id, aeroportDetails);
            return new ResponseEntity<>(updatedAeroport, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAeroport(@PathVariable Integer id) {
        try {
            aeroportService.deleteAeroport(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }
}
