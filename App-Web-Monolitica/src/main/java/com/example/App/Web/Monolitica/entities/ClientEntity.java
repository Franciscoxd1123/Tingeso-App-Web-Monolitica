package com.example.App.Web.Monolitica.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String name;
    private String lastName;
    private String rut;
    private int age;
    private int salary;
    private int saved;
    private int cSaved;
    private boolean latePayment;
    private int debt;
    private boolean freelance;
    private int seniority;
    private boolean stable;
    private int retreats;
    private int recentRetreats;
    private int deposits;
}