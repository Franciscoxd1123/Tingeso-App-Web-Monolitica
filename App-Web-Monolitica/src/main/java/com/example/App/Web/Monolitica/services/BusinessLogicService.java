package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.*;
import com.example.App.Web.Monolitica.repositories.*;
import org.springframework.stereotype.Service;

import static java.lang.Math.*;

@Service
public class BusinessLogicService {
    //Realiza el calculo de las cuotas mensuales
    //Realiza la simulación del prestamo para el usuario
    public double getMonthlyPayments(RequestEntity request){
        double M = 0; //M Cuota mensual
        int P = request.getAmount(); //P Monto préstamo
        float r = (request.getInterest() / 12) / 100; //r Tasa de interés mensual (Tasa anual/12/100)
        int n = request.getTime() * 12; //n Número total de pagos (Plazo en años * 12)

        //M = P * ((r * ((1 + r) ** n)) / (((1 + r) ** n) - 1));
        M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        return M;
    }

    /*
    private Long id;
    private String rut;
    private String type;
    private int amount;
    private float interest;
    private int time;
    private int state;
     */
}