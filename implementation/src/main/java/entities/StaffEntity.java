package entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StaffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_staff;

    @Column
    private String name;

    @Column
    private String fonction;

    @Column
    private String nationalite;

    @Column
    private Integer num_licence;

    @Column
    private String option;

    @ManyToOne
    @JoinColumn(name = "vol_id") // Relation avec un vol spécifique
    private VolEntity vol; // Vol auquel le personnel est affecté


}
