package com.springboot.EAPSCO.entity;

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
@Table(name = "Office")
@NoArgsConstructor
@AllArgsConstructor
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "office_code")
    private int code;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @ManyToMany
    @JoinTable(
            name = "Office_Employees",
            joinColumns = @JoinColumn(name = "office_code"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Employee> employees;

    @ManyToMany
    @JoinTable(
            name = "Office_Products",
            joinColumns = @JoinColumn(name = "office_code"),
            inverseJoinColumns = @JoinColumn(name = "product_code")
    )
    private List<Product> products;

    @OneToMany(mappedBy = "office")
    private List<Material> materials;

    @OneToMany(mappedBy = "office")
    private List<Service> services;


}
