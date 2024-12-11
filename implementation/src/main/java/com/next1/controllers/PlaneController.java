package com.next1.controllers;

import com.next1.entities.PlaneEntity;
import com.next1.entities.ReservationEntity;
import com.next1.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.next1.services.PlaneService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/planes")
public class PlaneController {
    @Autowired
    private PlaneService planeService;

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<PlaneEntity>> getAllPlanes() {
        List<PlaneEntity> planes = planeService.getAllplanes();
        return new ResponseEntity<>(planes, HttpStatus.OK);
    }

    // Récupérer une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<PlaneEntity> getPlaneById(@PathVariable Integer id) {
        return planeService.getPlaneById(id)
                .map(plane -> new ResponseEntity<>(plane, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<PlaneEntity> savePlane(@RequestBody PlaneEntity plane) {
        try {
            PlaneEntity newPlane = planeService.savePlane(plane);
            return new ResponseEntity<>(newPlane, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Si les données sont invalides
        }
    }

    // Mettre à jour une réservation existante
    @PutMapping("/{id}")
    public ResponseEntity<PlaneEntity> updateReservation(
            @PathVariable Integer id,
            @RequestBody PlaneEntity planeDetails) {
        try {
            PlaneEntity updatedPlane = planeService.updatePlane(id, planeDetails);
            return new ResponseEntity<>(updatedPlane, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlane(@PathVariable Integer id) {
        try {
            planeService.deletePlane(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }
}
