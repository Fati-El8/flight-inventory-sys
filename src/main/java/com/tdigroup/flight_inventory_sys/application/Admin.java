package com.tdigroup.flight_inventory_sys.application;


public class Admin extends User {
    private int idAdmin;

    // Constructeur
    public Admin(String email, String password, String nomComplet, int idAdmin) {
        super(email, password, nomComplet);
        this.idAdmin = idAdmin;
    }
}

