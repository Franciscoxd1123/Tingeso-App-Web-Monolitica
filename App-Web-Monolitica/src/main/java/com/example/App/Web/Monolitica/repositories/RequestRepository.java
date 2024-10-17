package com.example.App.Web.Monolitica.repositories;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<RequestEntity, Long> {
    public List<RequestEntity> findByRut(String rut);
}