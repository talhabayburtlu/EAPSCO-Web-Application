package com.springboot.EAPSCO.repository;

import com.springboot.EAPSCO.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "services", path = "services")
public interface ServiceRepository extends JpaRepository<Service, Integer> {

}
