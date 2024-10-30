package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.ClientEntity;
import com.example.App.Web.Monolitica.repositories.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;
    private ClientEntity client;

    @InjectMocks
    private ClientService clientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        client = new ClientEntity();
    }

    @Test
    void whenTestSaveClient_ThenCorrectSave() {
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

        //When
        when(clientRepository.save(client)).thenReturn(client);
        ClientEntity clientSave = clientService.saveClient(client);

        //Then
        assertThat(clientSave.getName()).isEqualTo(client.getName());
        assertThat(clientSave.getLastName()).isEqualTo(client.getLastName());
        assertThat(clientSave.getRut()).isEqualTo(client.getRut());
        assertThat(clientSave.getAge()).isEqualTo(client.getAge());
        assertThat(clientSave.getSalary()).isEqualTo(client.getSalary());
        assertThat(clientSave.getSaved()).isEqualTo(client.getSaved());
        assertThat(clientSave.getCSaved()).isEqualTo(client.getCSaved());
        assertThat(clientSave.isLatePayment()).isEqualTo(client.isLatePayment());
        assertThat(clientSave.getDebt()).isEqualTo(client.getDebt());
        assertThat(clientSave.isFreelance()).isEqualTo(client.isFreelance());
        assertThat(clientSave.getSeniority()).isEqualTo(client.getSeniority());
        assertThat(clientSave.isStable()).isEqualTo(client.isStable());
        assertThat(clientSave.getRetreats()).isEqualTo(client.getRetreats());
        assertThat(clientSave.getRecentRetreats()).isEqualTo(client.getRecentRetreats());
        assertThat(clientSave.getDeposits()).isEqualTo(client.getDeposits());
    }
}