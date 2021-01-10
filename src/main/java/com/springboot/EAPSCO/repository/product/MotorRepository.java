package com.springboot.EAPSCO.repository.product;


import com.springboot.EAPSCO.entity.product.Motor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "motors", path = "motors")
public interface MotorRepository extends JpaRepository<Motor, Integer> {

}
