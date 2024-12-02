package com.tdigroup.flight_inventory_sys.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;
import java.util.Date; // Ajouté pour gérer les dates
import java.util.List; // Ajout de l'import pour List

@Entity
@Data
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
        @JoinColumn(name = "admin_id") // La clé étrangère pour la relation ManyToOne avec AdminEntity
        private AdminEntity admin;

        @ManyToOne
        @JoinColumn(name = "aeroport_depart_id", referencedColumnName = "id_aeroport")
        private AeroportEntity aeroportDepart;

        @ManyToOne
        @JoinColumn(name = "aeroport_arrive_id", referencedColumnName = "id_aeroport")
        private AeroportEntity aeroportArrive;

        @ManyToOne
        @JoinColumn(name = "plane_id")
        private PlaneEntity plane;

        @OneToMany(mappedBy = "vol")
        private List<StaffEntity> staff; // Liste du personnel associé au vol

        @OneToMany(mappedBy = "vol", cascade = CascadeType.ALL)
        private List<ReservationEntity> reservations; // Liste des réservations pour ce vol

        @ManyToMany(mappedBy = "vols") // Relation ManyToMany avec UserEntity
        private Set<UserEntity> users = new HashSet<>();
}
