# Class Diagram

```mermaid
classDiagram
    User <|-- Admin
    User <|-- Passager
    User : - email
    User : -password
    User : - nom_complet
    class Admin{
      -id_admin
      +ajouter_membre()
      +supprimer_membre()
      +recuperer_membre()
      +mettre_a_jour_membre()
      +ajouter_avion()
      +supprimer_avion()
      +recuperer_avion()
      +mettre_a_jour_avion()
      +ajouter_vol()
      +supprimer_vol()
      +recuperer_vol()
      +mettre_a_jour_vol()
      +ajouter_aeroport()
      +supprimer_aeroport()
      +recuperer_aeroport()
      +mettre_a_jour_aeroport()
    }
    class Passager{
      -id_passager
      -num_passeport
      -num_carte_identite
      -nationnalite
      -adresse
      -telephone
      +ajouter_reservation()
      +supprimer_reservation()
      +recuperer_reservation()
      +mettre_a_jour_reservation()
    }
    
    class Vol{
      -id_vol
      -num_vol
      -vol_IATA
      -date_vol
      -aeroport_depart
      -aeroport_arrive
    }
    
    class Aeroport{
        -id_aeroport
        -aeroport_IATA
        -nom_aeroport
        -ville
        -pays
        -capacite
    }
    
    class Avion {
        -id_avion
        -type_avion
        -capacite
        -annee_fab
        -model
    }
    class Reservation {
        -id_reservation
        -vol_reserve
        -passager_reservant
        -date_reservation
        -status
        -prix_total
    }
    
    class Paiement{
        -id_paiment
    }
    class Membre_equipage{
        -nom_complet
        -fonction
        -num_licence
        -nationalite
        -option
    }
    Reservation "1" --> "1" Paiement : associee
    
    Avion "1.." <-- "1.." Aeroport : gere

    Avion "1.1*" <-- "1..*" Vol : associe

    Vol "1..*" --> "1" Aeroport : depart

    Vol "1..*" --> "1" Aeroport : arrive a 

    Vol "1.1*" --> "1..*" Membre_equipage : avoir
    
    Vol "1.1*" --> "1..*" Reservation : possede
    
    Admin "1.1" --> "1..*"Vol  : gerer

    Admin "1.1" --> "1..*"Membre_equipage  : gerer
    
    Passager "1.1*" --> "1..*" Reservation : faire
```