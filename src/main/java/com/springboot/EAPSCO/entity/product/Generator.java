package com.springboot.EAPSCO.entity.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "Generator")
@NoArgsConstructor
@AllArgsConstructor
public class Generator extends Product {

    @Column(name = "power")
    private short power;

    @Column(name = "dimensions")
    private String dimensions;

    @Column(name = "fuel_capacity")
    private double fuelCapacity;

}
