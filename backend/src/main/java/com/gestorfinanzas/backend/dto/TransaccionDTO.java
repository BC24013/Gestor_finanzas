package com.gestorfinanzas.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class TransaccionDTO {
    private Long id;
    private String descripcion;
    private BigDecimal monto;
    private LocalDate fecha;
    private String tipo;
    private Long usuarioId;
    private Long categoriaId;
}
