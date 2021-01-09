package com.springboot.EAPSCO.entity.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Individual_Customer")
@NoArgsConstructor
@AllArgsConstructor
public class IndividualCustomer {

    @Id
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @OneToOne
    @JoinColumn(name = "customer_id")
    @MapsId
    private Customer customer;
}
