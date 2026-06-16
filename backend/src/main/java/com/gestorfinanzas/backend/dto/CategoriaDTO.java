package com.gestorfinanzas.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CategoriaDTO {

    private Long id;

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede exceder 255 caracteres")
    private String descripcion;

    @NotBlank(message = "El tipo es obligatorio")
    @Pattern(regexp = "INGRESO|GASTO", message = "El tipo debe ser INGRESO o GASTO")
    private String tipo;
}
