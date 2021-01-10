package com.springboot.EAPSCO.repository;


import com.springboot.EAPSCO.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "suppliers", path = "suppliers")
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}
