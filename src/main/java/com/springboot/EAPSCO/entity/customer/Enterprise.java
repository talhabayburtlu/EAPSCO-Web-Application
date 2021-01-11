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
@Table(name = "Enterprise")
@NoArgsConstructor
@AllArgsConstructor
public class Enterprise extends Customer {

    @Column(name = "enterprise_name")
    private String enterpriseName;

}
