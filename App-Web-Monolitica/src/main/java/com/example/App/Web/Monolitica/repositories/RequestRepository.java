package com.example.App.Web.Monolitica.repositories;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Long> {
    public RequestEntity findByRut(String rut);
}