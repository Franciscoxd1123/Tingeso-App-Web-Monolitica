package com.example.App.Web.Monolitica.controllers;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import com.example.App.Web.Monolitica.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/mono/clients")
@CrossOrigin("*")
public class ClientController {
    @Autowired
    ClientService ClientService;

    @PostMapping("/")
    public ResponseEntity<ClientEntity> saveClient(@RequestBody ClientEntity client) {
        ClientEntity clientNew = ClientService.saveClient(client);
        return ResponseEntity.ok(clientNew);
    }

    @PutMapping("/")
    public ResponseEntity<ClientEntity> updateClient(@RequestBody ClientEntity client){
        ClientEntity clientUpdated = ClientService.updateClient(client);
        return ResponseEntity.ok(clientUpdated);
    }
}
