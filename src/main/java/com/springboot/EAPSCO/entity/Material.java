package com.springboot.EAPSCO.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "Material")
@NoArgsConstructor
@AllArgsConstructor
public class Material {

    @Id
    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private double price;

    @Column(name = "amount")
    private int amount;

    @ManyToOne
    @JoinColumn(name = "office_code")
    private Office office;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

}
