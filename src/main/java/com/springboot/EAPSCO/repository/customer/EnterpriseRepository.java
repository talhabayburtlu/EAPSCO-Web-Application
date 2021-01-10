package com.springboot.EAPSCO.repository.customer;

import com.springboot.EAPSCO.entity.customer.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "individualCustomers", path = "individualCustomers")
public interface EnterpriseRepository extends JpaRepository<Enterprise, Integer> {

}
