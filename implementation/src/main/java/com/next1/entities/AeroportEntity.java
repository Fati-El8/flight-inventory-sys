package entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class AeroportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_aeroport;

    @Column
    private String name_aeroport;

    @Column(length = 3)
    private String aeroport_IATA;

    @Column
    private String ville;

    @Column
    private String pays;

    @Column
    private int capacitie;

    @OneToMany
    @JoinColumn(name = "aeroport_id")
    // @OneToMany(mappedBy = "library", cascade = CascadeType.ALL)
    private List<VolEntity> vols;

    @OneToMany(mappedBy = "aeroport")
    private List<PlaneEntity> planes;

}
