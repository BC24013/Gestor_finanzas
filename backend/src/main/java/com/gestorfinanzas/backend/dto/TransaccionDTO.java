package com.gestorfinanzas.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransaccionDTO {

// Para obtener mensajes de errores con swagger modifico DTO para agregar las validaciones/restricciones de la bd

    private Long id;

    @Size(max = 255, message = "La descripción no puede exceder 255 caracteres")
    private String descripcion;   // Puede ser vacía o nula según el esquema

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "0.00", inclusive = true, message = "El monto no puede ser negativo")
    @Digits(integer = 10, fraction = 2, message = "El monto debe tener máximo 10 dígitos enteros y 2 decimales")
    private BigDecimal monto;

    @NotNull(message = "La fecha es obligatoria")
    @PastOrPresent(message = "La fecha no puede ser futura")
    private LocalDate fecha;

    @NotBlank(message = "El tipo es obligatorio")
    @Pattern(regexp = "INGRESO|GASTO", message = "El tipo debe ser INGRESO o GASTO")
    private String tipo;

    @NotNull(message = "El ID de usuario es obligatorio")
    private Long usuarioId;

    @NotNull(message = "El ID de categoría es obligatorio")
    private Long categoriaId;
}