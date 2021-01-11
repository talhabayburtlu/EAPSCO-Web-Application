package com.springboot.EAPSCO.entity.customer;

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
@Table(name = "Individual_Customer")
@NoArgsConstructor
@AllArgsConstructor
public class IndividualCustomer extends Customer {

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

}
