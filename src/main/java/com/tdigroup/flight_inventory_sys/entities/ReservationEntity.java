package com.tdigroup.flight_inventory_sys.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class ReservationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_reservation;

    @Column
    private Date date_reservation;

    @Column
    private String seatNumber;

    @Column
    private double prix; // Ajout de l'attribut prix

    @ManyToOne
    @JoinColumn(name = "vol_id") // Relation avec un vol
    private VolEntity vol;

    @ManyToOne
    @JoinColumn(name = "user_id") // Relation avec un utilisateur (passager)
    private UserEntity user;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL)
    private PaymentEntity payment;
}
