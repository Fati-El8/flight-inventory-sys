package com.next1.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SearchCriteria {
    private String nameAeroportDepart;
    private String nameAeroportArrive;

    public String getNameAeroportDepart() {
        return nameAeroportDepart;
    }

    public void setNameAeroportDepart(String nameAeroportDepart) {
        this.nameAeroportDepart = nameAeroportDepart;
    }

    public String getNameAeroportArrive() {
        return nameAeroportArrive;
    }

    public void setNameAeroportArrive(String nameAeroportArrive) {
        this.nameAeroportArrive = nameAeroportArrive;
    }
}
