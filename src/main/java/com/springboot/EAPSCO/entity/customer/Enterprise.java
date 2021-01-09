package com.springboot.EAPSCO.entity.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Enterprise")
@NoArgsConstructor
@AllArgsConstructor
public class Enterprise {
    @Id
    private int id;

    @Column(name = "enterprise_name")
    private String enterpriseName;

    @OneToOne
    @JoinColumn(name = "customer_id")
    @MapsId
    private Customer customer;
}
