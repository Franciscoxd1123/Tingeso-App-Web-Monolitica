package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import com.example.App.Web.Monolitica.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    public ArrayList<RequestEntity> getRequests(){
        return (ArrayList<RequestEntity>) requestRepository.findAll();
    }

    public RequestEntity getRequestById(Long id){
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public List<RequestEntity> getRequestsByRut(String rut){
        return requestRepository.findByRut(rut);
    }

    public RequestEntity saveRequest(RequestEntity request){
        return requestRepository.save(request);
    }

    public RequestEntity updateRequest(RequestEntity request, Long id) {
        RequestEntity requestUpdated = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        requestUpdated.setState(request.getState());
        return requestRepository.save(requestUpdated);
    }
}