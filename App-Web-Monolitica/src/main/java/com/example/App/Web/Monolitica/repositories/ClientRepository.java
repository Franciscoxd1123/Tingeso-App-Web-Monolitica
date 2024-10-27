package com.example.App.Web.Monolitica.repositories;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<ClientEntity, Long> {
    public ClientEntity findByRut(String rut);
}