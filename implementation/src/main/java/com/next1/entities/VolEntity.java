package com.next1.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
public class VolEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_vol;

    @Column(length = 3)
    private String vol_IATA;

    @Column
    private Integer num_vol;

    @Column
    private Date date_vol;

    @Column
    private String aeroport_depart;

    @Column
    private String aeroport_arrive;

    @ManyToOne
    @JoinColumn(name = "aeroport_depart_id",referencedColumnName = "id_aeroport")
    private AeroportEntity aeroportDepart;

    @ManyToOne
    @JoinColumn(name = "aeroport_arrive_id", referencedColumnName = "id_aeroport")
    private AeroportEntity aeroportArrive;

    @ManyToOne
    @JoinColumn(name = "plane_id")
    private PlaneEntity plane;

    @OneToMany(mappedBy = "vol")
    private List<StaffEntity> staff; // Liste du personnel associé au vo

    @OneToMany(mappedBy = "vol", cascade = CascadeType.ALL)
    private List<ReservationEntity> reservations; // Liste des réservations pour ce vol

    @ManyToOne
    @JoinColumn(name = "admin_id") // Colonne de clé étrangère dans la table VolEntity
    private UserEntity admin;
}
