package com.springboot.EAPSCO.repository.product;


import com.springboot.EAPSCO.entity.product.UPS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "upses", path = "upses")
public interface UPSRepository extends JpaRepository<UPS, Integer> {

}
