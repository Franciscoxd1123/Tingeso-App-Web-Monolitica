package com.example.App.Web.Monolitica.services;

import com.example.App.Web.Monolitica.entities.RequestEntity;
import com.example.App.Web.Monolitica.repositories.RequestRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class RequestServiceTest {

    @Mock
    private RequestRepository requestRepository;
    private RequestEntity request;

    @InjectMocks
    private RequestService requestService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        request = new RequestEntity();
    }

    @Test
    void whenTestGetRequests_ThenReturnListRequests() {
        //Given
        List<RequestEntity> requests = new ArrayList<>();
        RequestEntity request1 =
                new RequestEntity
                        (null, "12.345.678-9", "Primera vivienda", 80000000, 4.0F, 25, 3);
        RequestEntity request2 =
                new RequestEntity
                        (null, "45.678.901-2", "Primera vivienda", 80000000, 4.0F, 30, 3);
        requests.add(request1);
        requests.add(request2);

        //When
        when(requestRepository.findAll()).thenReturn(requests);
        ArrayList<RequestEntity> allRequests = requestService.getRequests();

        //Then
        assertThat(allRequests).isNotEmpty();
        assertThat(allRequests).hasSize(2);
        assertThat(allRequests).containsExactlyInAnyOrder(request1, request2);
    }

    @Test
    public void whenTestGetRequestById_ThenReturnRequest() {
        //Given
        RequestEntity request =
                new RequestEntity
                        (1L, "12.345.678-9", "Primera vivienda", 80000000, 4.0F, 25, 3);

        //When
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        RequestEntity requestId = requestService.getRequestById(1L);

        //Then
        assertThat(requestId).isNotNull();
        assertThat(requestId.getId()).isEqualTo(1L);
    }

    @Test
    public void whenTestGetRequestsByRut_ThenReturnListRequests() {
        //Given
        List<RequestEntity> requests = new ArrayList<>();
        RequestEntity request1 =
                new RequestEntity
                        (null, "12.345.678-9", "Primera vivienda", 80000000, 4.0F, 25, 3);
        RequestEntity request2 =
                new RequestEntity
                        (null, "12.345.678-9", "Segunda vivienda", 70000000, 5.0F, 15, 3);
        RequestEntity request3 =
                new RequestEntity
                        (null, "12.345.678-9", "Propiedad comercial", 50000000, 6.0F, 20, 3);
        requests.add(request1);
        requests.add(request2);
        requests.add(request3);


        //When
        when(requestRepository.findByRut("12.345.678-9")).thenReturn(requests);
        List<RequestEntity> requestRut = requestService.getRequestsByRut("12.345.678-9");

        //Then
        assertThat(requestRut).isNotEmpty();
        assertThat(requestRut).hasSize(3);
        assertThat(requestRut).containsExactlyInAnyOrder(request1, request2, request3);
    }

    @Test
    void whenTestSaveClient_ThenCorrectSave() {
        //Given
        request.setRut("34.567.890-1");
        request.setType("Remodelación");
        request.setAmount(20000000);
        request.setInterest(4.5F);
        request.setTime(10);
        request.setState(3);

        //When
        when(requestRepository.save(request)).thenReturn(request);
        RequestEntity requestSave = requestService.saveRequest(request);

        //Then
        assertThat(requestSave.getRut()).isEqualTo(request.getRut());
        assertThat(requestSave.getType()).isEqualTo(request.getType());
        assertThat(requestSave.getAmount()).isEqualTo(request.getAmount());
        assertThat(requestSave.getInterest()).isEqualTo(request.getInterest());
        assertThat(requestSave.getTime()).isEqualTo(request.getTime());
        assertThat(requestSave.getState()).isEqualTo(request.getState());
    }

    @Test
    void whenTestUpdateRequest_ThenReturnRequestUpdated() {
        //Given
        request.setId(1L);
        request.setRut("12.345.678-9");
        request.setType("Primera vivienda");
        request.setAmount(80000000);
        request.setInterest(4.0F);
        request.setTime(25);
        request.setState(3);

        //When
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        when(requestRepository.save(request)).
                thenAnswer(invocation -> invocation.getArgument(0));

        request.setState(4);
        RequestEntity requestUpdate = requestService.updateRequest(request, 1L);

        //Then
        assertThat(requestUpdate.getState()).isEqualTo(4);
    }
}
