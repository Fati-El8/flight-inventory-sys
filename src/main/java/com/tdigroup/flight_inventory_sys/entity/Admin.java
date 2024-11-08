package com.tdigroup.flight_inventory_sys.application;


public class Admin extends User {
    private int idAdmin;

    // Constructeur
    public Admin(String email, String password, String nomComplet, int idAdmin) {
        super(email, password, nomComplet);
        this.idAdmin = idAdmin;
    }
    // Méthodes pour gérer les membres
    public void ajouterMembre(Passager passager) {}
    public void supprimerMembre(Passager passager) {}
    public Passager recupererMembre(int idPassager) { return null; }
    public void mettreAJourMembre(Passager passager) {}

    // Méthodes pour gérer les avions
    public void ajouterAvion(Avion avion) {}
    public void supprimerAvion(Avion avion) {}
    public Avion recupererAvion(int idAvion) { return null; }
    public void mettreAJourAvion(Avion avion) {}

    // Méthodes pour gérer les vols
    public void ajouterVol(Vol vol) {}
    public void supprimerVol(Vol vol) {}
    public Vol recupererVol(int idVol) { return null; }
    public void mettreAJourVol(Vol vol) {}

    // Méthodes pour gérer les aéroports
    public void ajouterAeroport(Aeroport aeroport) {}
    public void supprimerAeroport(Aeroport aeroport) {}
    public Aeroport recupererAeroport(int idAeroport) { return null; }
    public void mettreAJourAeroport(Aeroport aeroport) {}
}


