package com.next1.controllers;

import com.next1.entities.*;
import com.next1.repositories.AroportRepository;
import com.next1.services.AeroportService;
import com.next1.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.next1.services.PlaneService;
import com.next1.services.VolService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vols")
public class VolController {

    @Autowired
    private VolService volService;
    @Autowired
    private AroportRepository aeroportRepository;
    @Autowired
    private AeroportService aeroportService;

    // Récupérer toutes les réservations
    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<VolEntity>> getAllvols() {
        List<VolEntity> vols = volService.getAllVols();
        return new ResponseEntity<>(vols, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<List<VolEntity>> searchFlights(@RequestBody SearchCriteria criteria) {
        List<VolEntity> results = volService.searchVols(criteria);
        return ResponseEntity.ok(results);
    }
    // Récupérer une réservation par ID
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<VolEntity> getVolById(@PathVariable Integer id) {
        return volService.getVolById(id)
                .map(vol -> new ResponseEntity<>(vol, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservationç
    @CrossOrigin
    @PostMapping
    public ResponseEntity<VolEntity> saveVol(@RequestBody VolEntity vol) {
        try {
            // Check if airports are provided
            if (vol.getAeroportDepart() == null || vol.getAeroportArrive() == null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            // Get the IDs and check if they're null
            Integer departId = vol.getAeroportDepart().getId_aeroport();
            Integer arriveId = vol.getAeroportArrive().getId_aeroport();

            if (departId == null || arriveId == null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            // Now safely search for airports
            Optional<AeroportEntity> departExisting = aeroportService.getAeroportById(departId);
            Optional<AeroportEntity> arriveExisting = aeroportService.getAeroportById(arriveId);

            if (!departExisting.isPresent() || !arriveExisting.isPresent()) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            // Create new vol with the found airports
            vol.setAeroportDepart(departExisting.get());
            vol.setAeroportArrive(arriveExisting.get());

            VolEntity newVol = volService.saveVol(vol);
            return new ResponseEntity<>(newVol, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Mettre à jour une réservation existante
    @CrossOrigin
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
    @CrossOrigin
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
