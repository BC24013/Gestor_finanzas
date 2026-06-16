package com.gestorfinanzas.backend.controller;

import com.gestorfinanzas.backend.dto.MetaDTO;
import com.gestorfinanzas.backend.service.MetaService;
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

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/metas")
@Tag(name = "Metas", description = "Endpoints para gestionar metas de ahorro")
public class MetaController {

    private final MetaService metaService;

    public MetaController(MetaService metaService) {
        this.metaService = metaService;
    }

    @Operation(summary = "Crear una nueva meta", description = "Registra una meta de ahorro en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Meta creada exitosamente",
                    content = @Content(schema = @Schema(implementation = MetaDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content)
    })
    @PostMapping
    public ResponseEntity<MetaDTO> crearMeta(@Valid @RequestBody MetaDTO dto) {
        try {
            MetaDTO creada = metaService.save(dto);
            return new ResponseEntity<>(creada, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Obtener todas las metas", description = "Lista todas las metas de ahorro registradas, opcionalmente filtradas por usuarioId")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<MetaDTO>> listarMetas(@RequestParam(required = false) Long usuarioId) {
        if (usuarioId != null) {
            return ResponseEntity.ok(metaService.findByUsuarioId(usuarioId));
        }
        List<MetaDTO> metas = metaService.findAll();
        return ResponseEntity.ok(metas);
    }

    @Operation(summary = "Obtener una meta por ID", description = "Busca una meta específica mediante su identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meta encontrada",
                    content = @Content(schema = @Schema(implementation = MetaDTO.class))),
            @ApiResponse(responseCode = "404", description = "Meta no encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<MetaDTO> obtenerMetaPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(metaService.findById(id));
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Actualizar una meta existente", description = "Modifica los datos de una meta por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Meta actualizada",
                    content = @Content(schema = @Schema(implementation = MetaDTO.class))),
            @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
            @ApiResponse(responseCode = "404", description = "Meta o usuario no encontrados", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<MetaDTO> actualizarMeta(@PathVariable Long id, @Valid @RequestBody MetaDTO dto) {
        try {
            return ResponseEntity.ok(metaService.update(id, dto));
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @Operation(summary = "Aportar fondos a una meta", description = "Agrega un monto al ahorro acumulado de una meta")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fondos aportados exitosamente",
                    content = @Content(schema = @Schema(implementation = MetaDTO.class))),
            @ApiResponse(responseCode = "400", description = "Monto inválido", content = @Content),
            @ApiResponse(responseCode = "404", description = "Meta no encontrada", content = @Content)
    })
    @PatchMapping("/{id}/fondos")
    public ResponseEntity<MetaDTO> aportarFondos(@PathVariable Long id, @RequestBody Map<String, BigDecimal> body) {
        try {
            BigDecimal amount = body.get("monto");
            if (amount == null) {
                throw new RuntimeException("El campo 'monto' es obligatorio");
            }
            return ResponseEntity.ok(metaService.addFunds(id, amount));
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Operation(summary = "Eliminar una meta", description = "Borra una meta del sistema por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Meta eliminada exitosamente", content = @Content),
            @ApiResponse(responseCode = "404", description = "Meta no encontrada", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMeta(@PathVariable Long id) {
        try {
            boolean eliminada = metaService.delete(id);
            return eliminada ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
