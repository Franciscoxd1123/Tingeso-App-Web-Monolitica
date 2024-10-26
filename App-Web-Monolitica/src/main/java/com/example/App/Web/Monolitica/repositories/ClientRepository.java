package com.example.App.Web.Monolitica.repositories;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import com.example.App.Web.Monolitica.entities.RequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    public ClientEntity findByRut(String rut);
}