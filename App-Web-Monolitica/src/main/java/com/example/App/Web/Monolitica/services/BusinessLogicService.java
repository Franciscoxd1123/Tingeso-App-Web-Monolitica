package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.*;
import com.example.App.Web.Monolitica.repositories.*;
import org.springframework.stereotype.Service;

import static java.lang.Math.*;

@Service
public class BusinessLogicService {
    //Realiza la simulación del prestamo para el usuario
    //Realiza el calculo de las cuotas mensuales
    public int getMonthlyPayments(RequestEntity request){
        double m = 0;
        int M = 0; //M Cuota mensual
        int P = request.getAmount(); //P Monto préstamo
        float r = (request.getInterest() / 12) / 100; //r Tasa de interés mensual (Tasa anual/12/100)
        int n = request.getTime() * 12; //n Número total de pagos (Plazo en años * 12)

        m = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        M = (int) Math.round(m);
        return M;
    }

    //Realiza el calculo de la relación Cuota/Ingreso
    public void getPaymentsSalary(ClientEntity client, RequestEntity request){
        if(request.getState() == 3){//Si la solicitud esta en estado 3.-En evaluación
            double R = 0;
            int salary = client.getSalary();//Se obtienen los ingresos mensuales
            int payments = getMonthlyPayments(request);//Se obtiene la cuota mensual

            R = (payments / salary) * 100;//Calculo de relación Cuota/Ingreso

            if(R > 35.0){//Si sobrepasa el umbral del banco
                request.setState(7);//Se rechaza la solicitud, estado 7.-Rechazada
            }
        }
    }

    //Revisa la antiguedad laboral y su estabilidad
    public void checkJob(ClientEntity client, RequestEntity request){
        if(request.getState() == 3){
            if(client.isFreelance() == false){//Si no es independiente
                if(client.getSeniority() == 0){
                    request.setState(7);
                }
            }
            else{//Si es independiente
                if(client.isStable() == false){
                    request.setState(7);
                }
            }
        }
    }

    //Realiza el calculo de la relación Deuda/Ingreso
    public void getDebtSalary(ClientEntity client, RequestEntity request){
        if(request.getState() == 3) {
            if (client.isLatePayment() == true) {//Si es que tiene deudas
                int debts = client.getDebt() + getMonthlyPayments(request);//Deudas + Cuota mensual
                int salary = client.getSalary();
                double R = salary * 0.5;

                if(debts > R){
                    request.setState(7);
                }
            }
        }
    }

    /* Revisar
    -Monto Máximo de Financiamiento:
    El banco tiene reglas sobre el porcentaje máximo del valor de la propiedad que puede financiar dependiendo del tipo de préstamo.
     */

    //Realiza la verificación de la edad del cliente
    /*
     -Edad del Solicitante:
     La edad máxima permitida al momento de finalizar el préstamo suele ser 75 años. Si el solicitante es muy cercano a esta edad,
     el plazo del préstamo se rechaza. Nota: “muy cercano a esta edad” significa que el solicitante tendría 5 años o menos de margen
     antes de alcanzar la edad máxima de 75 años al finalizar el plazo del préstamo.
    */

    //Revisa la capacidad de ahorro
    public void savingsCapacity(ClientEntity client, RequestEntity request){
        int C = 0;
        double ten = request.getAmount() * 0.1;//10% del monto del préstamo solicitado
        double twenty = request.getAmount();//20% del monto del préstamo solicitado
        double thirty = client.getSaved() * 0.3;//30% del saldo de su cuenta
        double five = client.getSalary() * 0.05;//5% de sus ingresos mensuales

        if(request.getState() == 3){
            //Saldo Mínimo Requerido
            if(client.getSaved() >= ten){
                C = C + 1;
            }

            //Historial de Ahorro Consistente


            //Depósitos Periódicos
            if(client.getDeposits() >= five){//Depósitos últimos 12 meses
                C = C + 1;
            }

            //Relación Saldo/Años de Antigüedad
            if(client.getCSaved() < 2 && client.getSaved() >= twenty){//Menos de 2 años en su cuenta de ahorros
                C = C + 1;
            } else if (client.getCSaved() >= 2 && client.getSaved() >= ten) {//2 años o más con la cuenta
                C = C + 1;
            }

            //Retiros Recientes
            if(client.getRecentRetreats() <= thirty){//Retiros últimos 6 meses
                C = C + 1;
            }
        }

        if(C == 5){
            request.setState(4);//La solicitud esta en estado 4.-Pre-Aprobada
        } else if (C < 2) {
            request.setState(7);
        }
    }

    //Calcula los costos totales
    public int getTotalCosts(ClientEntity client, RequestEntity request){
        int M = getMonthlyPayments(request);//Cuota mensual

        double sd = request.getAmount() * 0.0003;//Seguro de desgravamen (Mensual)
        int SD = (int) Math.round(sd);

        int SI = 20000;//Seguro de incendios (Mensual)

        double ca = request.getAmount() * 0.01;//Comisión por administración (cobro inicial)
        int CA = (int) Math.round(ca);

        int CM = M + SD + SI;//Costo mensual
        int CT = (CM * (request.getTime() * 12)) + CA;//Costo total que se presentara al cliente
        return CT;
    }
}