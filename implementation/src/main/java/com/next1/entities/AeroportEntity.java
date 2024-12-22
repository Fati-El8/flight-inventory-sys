package com.next1.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AeroportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_aeroport;

    @Column
    private String nameAeroport;

    @Column(length = 3)
    private String aeroport_IATA;

    @Column
    private String ville;

    @Column
    private String pays;

    @Column
    private int capacitie;


    @OneToMany(mappedBy = "aeroportDepart") // Relation avec l'aéroport de départ dans VolEntity
    private List<VolEntity> volsDepart;

    @OneToMany(mappedBy = "aeroportArrive") // Relation avec l'aéroport d'arrivée dans VolEntity
    private List<VolEntity> volsArrive;


}
