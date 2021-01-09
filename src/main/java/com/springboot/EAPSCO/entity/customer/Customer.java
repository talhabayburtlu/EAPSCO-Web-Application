package com.springboot.EAPSCO.entity.customer;

import com.springboot.EAPSCO.entity.Service;
import com.springboot.EAPSCO.entity.product.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Customer")
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private int id;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "customer")
    private List<Product> products;

    @OneToMany(mappedBy = "customer")
    private List<Service> services;

}
