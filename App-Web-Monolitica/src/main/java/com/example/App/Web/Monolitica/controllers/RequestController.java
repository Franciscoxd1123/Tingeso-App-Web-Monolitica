package com.example.App.Web.Monolitica.controllers;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import com.example.App.Web.Monolitica.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/app/mono/requests")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    RequestService requestService;

    @GetMapping("/")
    public ResponseEntity<List<RequestEntity>> listRequests() {
        List<RequestEntity> requests = requestService.getRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestEntity> getRequestById(@PathVariable Long id) {
        RequestEntity request = requestService.getRequestById(id);
        return ResponseEntity.ok(request);
    }

    @GetMapping("/rut/{rut}")
    public ResponseEntity<List<RequestEntity>> getRequestsByRut(@PathVariable String rut) {
        List<RequestEntity> requests = requestService.getRequestsByRut(rut);
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/")
    public ResponseEntity<RequestEntity> saveRequest(@RequestBody RequestEntity request) {
        RequestEntity requestNew = requestService.saveRequest(request);
        return ResponseEntity.ok(requestNew);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestEntity> updateRequest(@RequestBody RequestEntity request, @PathVariable Long id){
        RequestEntity requestUpdated = requestService.updateRequest(request, id);
        return ResponseEntity.ok(requestUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteRequestById(@PathVariable Long id) throws Exception {
        var isDeleted = requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}