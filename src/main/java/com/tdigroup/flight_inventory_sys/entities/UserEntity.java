package com.tdigroup.flight_inventory_sys.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;

    @Column
    private String username;

    @ManyToMany
    @JoinTable(
            name = "user_vol", // Table de jointure pour relier les utilisateurs et les vols
            joinColumns = @JoinColumn(name = "user_id"), // Colonne pour l'utilisateur
            inverseJoinColumns = @JoinColumn(name = "vol_id") // Colonne pour le vol
    )
    private Set<VolEntity> vols = new HashSet<>(); // Relation ManyToMany avec VolEntity
}
