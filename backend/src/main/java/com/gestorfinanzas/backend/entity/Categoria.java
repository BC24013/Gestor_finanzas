package com.gestorfinanzas.backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "categoria")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Categoria extends BaseEntity {
    private String nombre;
    private String descripcion;
    private String tipo;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "categoria")
    private List<Transaccion> transacciones = new ArrayList<>();

    // Lado inverso de la relación N:M con Usuario
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany(mappedBy = "categorias")
    private List<Usuario> usuarios = new ArrayList<>();
}