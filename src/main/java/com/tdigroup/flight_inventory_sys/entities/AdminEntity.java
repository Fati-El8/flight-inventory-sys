package com.tdigroup.flight_inventory_sys.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class AdminEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id_admin;

        @Column
        private String email;

        @Column
        private String password;

        @Column
        private String nom_complet;

        @OneToMany(mappedBy = "admin") // Relation OneToMany avec VolEntity
        private List<VolEntity> vols;

        @OneToMany(mappedBy = "admin") // Relation OneToMany avec CrewMemberEntity
        private List<CrewMemberEntity> crewMembers;
}
