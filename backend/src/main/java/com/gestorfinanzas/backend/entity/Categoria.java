package com.gestorfinanzas.backend.entity;

import jakarta.persistence.Entity; 
import jakarta.persistence.Table;
import lombok.Data; 
import lombok.EqualsAndHashCode; 

@Entity
@Table(name = "categoria")
@Data
@EqualsAndHashCode(callSuper = true)
public class Categoria extends BaseEntity {
    private String nombre;
    private String descripcion;
    private String tipo;
}