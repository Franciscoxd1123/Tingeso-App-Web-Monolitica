package com.example.App.Web.Monolitica.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cuentasAhorro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuentasAhorroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String rut;
    private int saldo;
}
