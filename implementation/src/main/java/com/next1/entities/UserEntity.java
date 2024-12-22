package com.next1.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles = new HashSet<>();

    @OneToMany(mappedBy = "admin") // Le champ "admin" est défini dans VolEntity
    private List<VolEntity> volsGeres;

    @OneToMany(mappedBy = "admin") // Relation avec StaffEntity
    private List<StaffEntity> supervisedStaff; // Liste des membres d'équipage supervisés

    @OneToMany(mappedBy = "passager") // Relation avec StaffEntity
    private List<ReservationEntity> reservations; // Liste des membres d'équipage supervisés
}
