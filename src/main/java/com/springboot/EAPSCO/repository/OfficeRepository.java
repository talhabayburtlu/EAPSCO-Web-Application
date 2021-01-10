package com.springboot.EAPSCO.repository;


import com.springboot.EAPSCO.entity.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "offices", path = "offices")
public interface OfficeRepository extends JpaRepository<Office, Integer> {

}
