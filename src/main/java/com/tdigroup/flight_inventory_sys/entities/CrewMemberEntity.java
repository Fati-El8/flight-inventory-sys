package com.tdigroup.flight_inventory_sys.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CrewMemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private AdminEntity admin;

    // Autres propriétés et méthodes
}
