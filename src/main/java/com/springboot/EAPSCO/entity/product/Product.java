package com.springboot.EAPSCO.entity.product;

import com.springboot.EAPSCO.entity.Office;
import com.springboot.EAPSCO.entity.customer.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Product")
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_code")
    private int code;

    @Column(name = "price")
    private double price;

    @Column(name = "is_sold")
    private boolean isSold;

    @Column(name = "type", insertable = false, updatable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY)
    private List<Office> offices;

}
