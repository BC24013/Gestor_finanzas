package com.gestorfinanzas.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class MetaDTO {

    private Long id;

    @NotBlank(message = "El nombre de la meta es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @NotNull(message = "El monto objetivo es obligatorio")
    @DecimalMin(value = "0.01", message = "El monto objetivo debe ser mayor a cero")
    @Digits(integer = 10, fraction = 2, message = "El monto debe tener máximo 10 dígitos enteros y 2 decimales")
    private BigDecimal montoObjetivo;

    @NotNull(message = "El monto actual es obligatorio")
    @DecimalMin(value = "0.00", inclusive = true, message = "El monto actual no puede ser negativo")
    @Digits(integer = 10, fraction = 2, message = "El monto debe tener máximo 10 dígitos enteros y 2 decimales")
    private BigDecimal montoActual;

    private LocalDate fechaLimite;

    @NotNull(message = "El ID de usuario es obligatorio")
    private Long usuarioId;

    // Campo calculado para el frontend
    private String usuarioNombre;
}
