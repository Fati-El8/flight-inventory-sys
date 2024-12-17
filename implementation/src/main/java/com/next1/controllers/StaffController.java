package com.next1.controllers;

import com.next1.entities.ReservationEntity;
import com.next1.entities.StaffEntity;
import com.next1.entities.VolEntity;
import com.next1.services.ReservationService;
import com.next1.services.StaffService;
import com.next1.services.VolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {


    @Autowired
    private StaffService staffService;

    // Récupérer toutes les réservations
    @GetMapping
    public ResponseEntity<List<StaffEntity>> getAllStaff() {
        List<StaffEntity> staff = staffService.getallStaff();
        return new ResponseEntity<>(staff, HttpStatus.OK);
    }

    // Récupérer une réservation par ID
    @GetMapping("/{id}")
    public ResponseEntity<StaffEntity> getStaffnById(@PathVariable Integer id) {
        return staffService.getStaffById(id)
                .map(staff -> new ResponseEntity<>(staff, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Créer une nouvelle réservation
    @PostMapping
    public ResponseEntity<StaffEntity> createStaff(@RequestBody StaffEntity staff) {
        try {
            StaffEntity newStaff = staffService.saveStaff(staff);
            return new ResponseEntity<>(newStaff, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Si les données sont invalides
        }
    }

    // Mettre à jour une réservation existante
    @PutMapping("/{id}")
    public ResponseEntity<StaffEntity> updateReservation(
            @PathVariable Integer id,
            @RequestBody StaffEntity staffDetails) {
        try {
            StaffEntity updatedStaff = staffService.updateStaff(id, staffDetails);
            return new ResponseEntity<>(updatedStaff, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }

    // Supprimer une réservation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Integer id) {
        try {
            staffService.deleteStaff(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Si la réservation n'existe pas
        }
    }
}
