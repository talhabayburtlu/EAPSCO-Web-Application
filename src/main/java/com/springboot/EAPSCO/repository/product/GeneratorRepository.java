package com.springboot.EAPSCO.repository.product;


import com.springboot.EAPSCO.entity.product.Generator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "generators", path = "generators")
public interface GeneratorRepository extends JpaRepository<Generator, Integer> {

}
