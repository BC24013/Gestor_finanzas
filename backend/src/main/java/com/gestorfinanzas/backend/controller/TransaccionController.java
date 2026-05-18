package com.gestorfinanzas.backend.controller;

import com.gestorfinanzas.backend.dto.TransaccionDTO;
import com.gestorfinanzas.backend.service.TransaccionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/transacciones")
@Tag(name = "Transacciones", description = "Endpoints para gestionar transacciones financieras")
public class TransaccionController {

    private final TransaccionService transaccionService;

    public TransaccionController(TransaccionService transaccionService) {
        this.transaccionService = transaccionService;
    }

    @Operation(summary = "Crear una nueva transacción", description = "Registra una transacción en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Transacción creada exitosamente",
                    content = @Content(schema = @Schema(implementation = TransaccionDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "Usuario o categoría no encontrados", content = @Content)
    })
    @PostMapping
    public ResponseEntity<TransaccionDTO> crearTransaccion(@Valid @RequestBody TransaccionDTO dto) {
        try {
            TransaccionDTO creada = transaccionService.save(dto);
            return new ResponseEntity<>(creada, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Obtener todas las transacciones", description = "Lista todas las transacciones registradas")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<TransaccionDTO>> listarTransacciones() {
        List<TransaccionDTO> transacciones = transaccionService.findAll();
        return ResponseEntity.ok(transacciones);
    }

    @Operation(summary = "Obtener una transacción por ID", description = "Busca una transacción específica mediante su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transacción encontrada",
                    content = @Content(schema = @Schema(implementation = TransaccionDTO.class))),
            @ApiResponse(responseCode = "404", description = "Transacción no encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<TransaccionDTO> obtenerTransaccionPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(transaccionService.findById(id));
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Actualizar una transacción existente", description = "Modifica los datos de una transacción por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Transacción actualizada",
                    content = @Content(schema = @Schema(implementation = TransaccionDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "Transacción, usuario o categoría no encontrados", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<TransaccionDTO> actualizarTransaccion(@PathVariable Long id, @Valid @RequestBody TransaccionDTO dto) {
        try {
            return ResponseEntity.ok(transaccionService.update(id, dto));
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Eliminar una transacción", description = "Borra una transacción del sistema por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Transacción eliminada exitosamente", content = @Content),
            @ApiResponse(responseCode = "404", description = "Transacción no encontrada", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(@PathVariable Long id) {
        try {
            boolean eliminado = transaccionService.delete(id);
            return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}