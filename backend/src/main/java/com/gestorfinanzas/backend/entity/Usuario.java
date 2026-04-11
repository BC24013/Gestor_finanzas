package com.gestorfinanzas.backend.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity; 
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode; 
import lombok.ToString;

@Entity 
@Table(name = "usuario") 
@Data
@EqualsAndHashCode(callSuper = true) 
@ToString(callSuper = true)
public class Usuario extends BaseEntity { // Hereda correctamente de BaseEntity
    private String nombre;
    private String gmail;
    private String password;
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Transaccion> transacciones;
}