package com.springboot.EAPSCO.repository.customer;

import com.springboot.EAPSCO.entity.customer.IndividualCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "individualCustomers", path = "individualCustomers")
public interface IndividualCustomerRepository extends JpaRepository<IndividualCustomer, Integer> {

}
