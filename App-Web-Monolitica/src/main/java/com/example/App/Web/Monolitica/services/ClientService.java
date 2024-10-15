package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import com.example.App.Web.Monolitica.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public ClientEntity saveClient(ClientEntity client){
        return clientRepository.save(client);
    }

    public ClientEntity updateClient(ClientEntity client) {
        return clientRepository.save(client);
    }
}