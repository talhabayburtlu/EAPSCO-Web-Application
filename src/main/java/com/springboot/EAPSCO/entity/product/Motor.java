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
@Table(name = "Motor")
@NoArgsConstructor
@AllArgsConstructor
public class Motor extends Product {

    @Column(name = "power")
    private short power;

    @Column(name = "rpm")
    private short rpm;

    @Column(name = "mtype")
    private String mtype;

}
