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
@Table(name = "UPS")
@NoArgsConstructor
@AllArgsConstructor
public class UPS extends Product {

    @Column(name = "capacity")
    private short capacity;

    @Column(name = "voltage")
    private short voltage;

    @Column(name = "dimensions")
    private String dimensions;

}
