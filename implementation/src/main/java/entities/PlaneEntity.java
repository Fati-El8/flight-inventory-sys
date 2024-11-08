package entities;

import jakarta.persistence.Entity;
import lombok.Data;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data

public class PlaneEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_plane;

    @Column
    private String type_avion;

    @Column
    private int capacity;

    @Column
    private int manuf_yeaar;

    @Column
    private String model;

    @ManyToOne
    @JoinColumn(name = "aeroport_id")
    private AeroportEntity aeroport;

    @OneToMany(mappedBy = "plane")
    private List<VolEntity> vols;



}
