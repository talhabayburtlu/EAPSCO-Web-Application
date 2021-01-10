package com.springboot.EAPSCO.repository;


import com.springboot.EAPSCO.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "materials", path = "materials")
public interface MaterialRepository extends JpaRepository<Material, Integer> {

}
