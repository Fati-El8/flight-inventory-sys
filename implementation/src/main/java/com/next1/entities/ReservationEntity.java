package com.next1.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Data
@Getter
@Setter
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
    @JoinColumn(name = "passager_id") // Relation avec un utilisateur (passager)
    private UserEntity passager;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL)
    private PaymentEntity payment;


}
