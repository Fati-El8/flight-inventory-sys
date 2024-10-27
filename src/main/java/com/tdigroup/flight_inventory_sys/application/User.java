package com.tdigroup.flight_inventory_sys.application;
import java.util.ArrayList;
import java.util.List;

public class User {
        private String email;
        private String password;
        private String nomComplet;

        // Constructeur
        public User(String email, String password, String nomComplet) {
            this.email = email;
            this.password = password;
            this.nomComplet = nomComplet;
        }

        // Getters et Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getNomComplet() { return nomComplet; }
        public void setNomComplet(String nomComplet) { this.nomComplet = nomComplet; }
    }

