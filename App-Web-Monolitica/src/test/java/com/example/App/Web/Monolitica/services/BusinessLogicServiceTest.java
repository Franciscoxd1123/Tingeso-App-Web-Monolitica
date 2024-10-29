package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import com.example.App.Web.Monolitica.entities.RequestEntity;
import com.example.App.Web.Monolitica.services.BusinessLogicService;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BusinessLogicServiceTest {

    BusinessLogicService businessLogic = new BusinessLogicService();
    RequestEntity request = new RequestEntity();
    ClientEntity client = new ClientEntity();

    @Test
    void whenCalculatingMonthlyPayments_thenShouldReturnPositiveValue(){
        //Given
        request.setRut("12.345.678-9");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(25);
        request.setState(3);

        //When
        int monthlyPayments = businessLogic.getMonthlyPayments(request);

        //Then
        assertThat(monthlyPayments).isGreaterThan(0);
    }

    @Test
    void whenCalculatingMonthlyPayments_thenCorrect(){
        //Given
        request.setRut("23.456.789-0");
        request.setType("Segunda vivienda");
        request.setAmount(70000000);
        request.setInterest(5.0F);
        request.setTime(15);
        request.setState(3);

        //When
        int monthlyPayments = businessLogic.getMonthlyPayments(request);

        //Then
        assertThat(monthlyPayments).isEqualTo(553556);
    }

    @Test
    void whenCalculatingPaymentsSalary_thenShouldReturnState3(){
        //Given
        client.setName("Pedro");
        client.setLastName("Ramírez");
        client.setRut("34.567.890-1");
        client.setAge(50);
        client.setSalary(1000000);
        client.setSaved(5000000);
        client.setCSaved(2);
        client.setLatePayment(false);
        client.setDebt(0);
        client.setFreelance(false);
        client.setSeniority(10);
        client.setStable(true);
        client.setRetreats(200000);
        client.setRecentRetreats(100000);
        client.setDeposits(80000);

        request.setRut("34.567.890-1");
        request.setType("Remodelación");
        request.setAmount(20000000);
        request.setInterest(4.5F);
        request.setTime(10);
        request.setState(3);

        //When
        businessLogic.getPaymentsSalary(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(3);
    }

    @Test
    void whenCalculatingPaymentsSalary_thenShouldUpdateState7(){
        //Given
        client.setName("Pedro");
        client.setLastName("Ramírez");
        client.setRut("34.567.890-1");
        client.setAge(50);
        client.setSalary(500000);
        client.setSaved(5000000);
        client.setCSaved(2);
        client.setLatePayment(false);
        client.setDebt(0);
        client.setFreelance(false);
        client.setSeniority(10);
        client.setStable(true);
        client.setRetreats(200000);
        client.setRecentRetreats(100000);
        client.setDeposits(80000);

        request.setRut("34.567.890-1");
        request.setType("Remodelación");
        request.setAmount(50000000);
        request.setInterest(4.5F);
        request.setTime(8);
        request.setState(3);

        //When
        businessLogic.getPaymentsSalary(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(7);
    }

    @Test
    void whenCheckingJob_thenShouldReturnState3FreelanceFalse(){
        //Given
        client.setName("Carlos");
        client.setLastName("Díaz");
        client.setRut("45.678.901-2");
        client.setAge(30);
        client.setSalary(600000);
        client.setSaved(2000000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(3000000);
        client.setFreelance(false);
        client.setSeniority(5);
        client.setStable(false);
        client.setRetreats(1000000);
        client.setRecentRetreats(700000);
        client.setDeposits(20000);

        request.setRut("45.678.901-2");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(30);
        request.setState(3);

        //When
        businessLogic.checkJob(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(3);
    }

    @Test
    void whenCheckingJob_thenShouldUpdateState7FreelanceFalse(){
        //Given
        client.setName("Carlos");
        client.setLastName("Díaz");
        client.setRut("45.678.901-2");
        client.setAge(30);
        client.setSalary(600000);
        client.setSaved(2000000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(3000000);
        client.setFreelance(false);
        client.setSeniority(0);
        client.setStable(false);
        client.setRetreats(1000000);
        client.setRecentRetreats(700000);
        client.setDeposits(20000);

        request.setRut("45.678.901-2");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(30);
        request.setState(3);

        //When
        businessLogic.checkJob(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(7);
    }

    @Test
    void whenCheckingJob_thenShouldReturnState3FreelanceTrue(){
        //Given
        client.setName("Carlos");
        client.setLastName("Díaz");
        client.setRut("45.678.901-2");
        client.setAge(30);
        client.setSalary(600000);
        client.setSaved(2000000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(3000000);
        client.setFreelance(true);
        client.setSeniority(10);
        client.setStable(true);
        client.setRetreats(1000000);
        client.setRecentRetreats(700000);
        client.setDeposits(20000);

        request.setRut("45.678.901-2");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(30);
        request.setState(3);

        //When
        businessLogic.checkJob(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(3);
    }

    @Test
    void whenCheckingJob_thenShouldUpdateState7FreelanceTrue(){
        //Given
        client.setName("Carlos");
        client.setLastName("Díaz");
        client.setRut("45.678.901-2");
        client.setAge(30);
        client.setSalary(600000);
        client.setSaved(2000000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(3000000);
        client.setFreelance(true);
        client.setSeniority(2);
        client.setStable(false);
        client.setRetreats(1000000);
        client.setRecentRetreats(700000);
        client.setDeposits(20000);

        request.setRut("45.678.901-2");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(30);
        request.setState(3);

        //When
        businessLogic.checkJob(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(7);
    }

    @Test
    void whenCalculatingDebtSalary_thenShouldReturnState3(){
        //Given
        client.setName("Laura");
        client.setLastName("Rojas");
        client.setRut("67.890.123-4");
        client.setAge(38);
        client.setSalary(1000000);
        client.setSaved(500000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(5000);
        client.setFreelance(false);
        client.setSeniority(1);
        client.setStable(true);
        client.setRetreats(600000);
        client.setRecentRetreats(300000);
        client.setDeposits(40000);

        request.setRut("67.890.123-4");
        request.setType("Segunda vivienda");
        request.setAmount(60000000);
        request.setInterest(5.5F);
        request.setTime(20);
        request.setState(3);

        //When
        businessLogic.getDebtSalary(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(3);
    }

    @Test
    void whenCalculatingDebtSalary_thenShouldUpdatedState7(){
        //Given
        client.setName("Laura");
        client.setLastName("Rojas");
        client.setRut("67.890.123-4");
        client.setAge(38);
        client.setSalary(1000000);
        client.setSaved(500000);
        client.setCSaved(1);
        client.setLatePayment(true);
        client.setDebt(5000000);
        client.setFreelance(false);
        client.setSeniority(1);
        client.setStable(true);
        client.setRetreats(600000);
        client.setRecentRetreats(300000);
        client.setDeposits(40000);

        request.setRut("67.890.123-4");
        request.setType("Segunda vivienda");
        request.setAmount(60000000);
        request.setInterest(5.5F);
        request.setTime(20);
        request.setState(3);

        //When
        businessLogic.getDebtSalary(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(7);
    }

    @Test
    void whenCalculatingSavingsCapacity_thenShouldUpdatedState4(){
        //Given
        client.setName("María");
        client.setLastName("López");
        client.setRut("23.456.789-0");
        client.setAge(40);
        client.setSalary(1800000);
        client.setSaved(15000000);
        client.setCSaved(5);
        client.setLatePayment(false);
        client.setDebt(0);
        client.setFreelance(true);
        client.setSeniority(0);
        client.setStable(true);
        client.setRetreats(300000);
        client.setRecentRetreats(150000);
        client.setDeposits(120000);

        request.setRut("23.456.789-0");
        request.setType("Segunda vivienda");
        request.setAmount(70000000);
        request.setInterest(5.0F);
        request.setTime(15);
        request.setState(3);

        //When
        businessLogic.savingsCapacity(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(4);
    }

    @Test
    void whenCalculatingSavingsCapacity_thenShouldUpdatedState7(){
        //Given
        client.setName("Ana");
        client.setLastName("Gómez");
        client.setRut("56.789.012-3");
        client.setAge(45);
        client.setSalary(1200000);
        client.setSaved(1500000);
        client.setCSaved(0);
        client.setLatePayment(false);
        client.setDebt(0);
        client.setFreelance(true);
        client.setSeniority(2);
        client.setStable(false);
        client.setRetreats(800000);
        client.setRecentRetreats(500000);
        client.setDeposits(30000);

        request = new RequestEntity();
        request.setRut("56.789.012-3");
        request.setType("Propiedad comercial");
        request.setAmount(50000000);
        request.setInterest(6.0F);
        request.setTime(20);
        request.setState(3);

        //When
        businessLogic.savingsCapacity(client,request);

        //Then
        assertThat(request.getState()).isEqualTo(7);
    }

    @Test
    void whenCalculatingTotalCosts_thenShouldReturnPositiveValue(){
        //Given
        client.setName("Pedro");
        client.setLastName("Ramírez");
        client.setRut("34.567.890-1");
        client.setAge(50);
        client.setSalary(1000000);
        client.setSaved(5000000);
        client.setCSaved(2);
        client.setLatePayment(false);
        client.setDebt(0);
        client.setFreelance(false);
        client.setSeniority(10);
        client.setStable(true);
        client.setRetreats(200000);
        client.setRecentRetreats(100000);
        client.setDeposits(80000);

        request.setRut("34.567.890-1");
        request.setType("Remodelación");
        request.setAmount(20000000);
        request.setInterest(4.5F);
        request.setTime(10);
        request.setState(3);

        //When
        int totalCosts = businessLogic.getTotalCosts(client,request);

        //Then
        assertThat(totalCosts).isGreaterThan(0);


    }
}