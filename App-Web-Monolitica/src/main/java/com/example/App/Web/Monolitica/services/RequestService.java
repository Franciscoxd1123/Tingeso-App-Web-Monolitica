package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import com.example.App.Web.Monolitica.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;

    public ArrayList<RequestEntity> getRequests(){
        return (ArrayList<RequestEntity>) requestRepository.findAll();
    }

    public RequestEntity saveRequest(RequestEntity request){
        return requestRepository.save(request);
    }

    public RequestEntity getRequestById(Long id){
        return requestRepository.findById(id).get();
    }

    public RequestEntity getRequestByRut(String rut){
        return requestRepository.findByRut(rut);
    }

    public RequestEntity updateRequest(RequestEntity request) {
        return requestRepository.save(request);
    }

    public boolean deleteRequest(Long id) throws Exception {
        try{
            requestRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }
}