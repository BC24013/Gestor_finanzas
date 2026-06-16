package com.gestorfinanzas.backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestorfinanzas.backend.dto.MetaDTO;
import com.gestorfinanzas.backend.entity.Meta;
import com.gestorfinanzas.backend.entity.Usuario;
import com.gestorfinanzas.backend.repository.MetaRepository;
import com.gestorfinanzas.backend.repository.UsuarioRepository;

@Service
public class MetaService {

    private final MetaRepository metaRepository;
    private final UsuarioRepository usuarioRepository;

    public MetaService(MetaRepository metaRepository, UsuarioRepository usuarioRepository) {
        this.metaRepository = metaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Crear meta
    public MetaDTO save(MetaDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + dto.getUsuarioId()));

        Meta meta = new Meta();
        meta.setNombre(dto.getNombre());
        meta.setMontoObjetivo(dto.getMontoObjetivo());
        meta.setMontoActual(dto.getMontoActual() != null ? dto.getMontoActual() : BigDecimal.ZERO);
        meta.setFechaLimite(dto.getFechaLimite());
        meta.setUsuario(usuario);

        Meta saved = metaRepository.save(meta);
        return convertToDTO(saved);
    }

    // Listar todas
    public List<MetaDTO> findAll() {
        return metaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public MetaDTO findById(Long id) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada con ID: " + id));
        return convertToDTO(meta);
    }

    // Buscar por usuario
    public List<MetaDTO> findByUsuarioId(Long usuarioId) {
        return metaRepository.findByUsuarioId(usuarioId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Actualizar
    public MetaDTO update(Long id, MetaDTO dto) {
        return metaRepository.findById(id).map(existing -> {
            existing.setNombre(dto.getNombre());
            existing.setMontoObjetivo(dto.getMontoObjetivo());
            existing.setMontoActual(dto.getMontoActual());
            existing.setFechaLimite(dto.getFechaLimite());

            existing.setUsuario(
                usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
            );

            Meta updated = metaRepository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Meta no encontrada con ID: " + id));
    }

    // Aportar fondos a una meta
    public MetaDTO addFunds(Long id, BigDecimal amount) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meta no encontrada con ID: " + id));

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("El monto debe ser mayor a cero");
        }

        BigDecimal remaining = meta.getMontoObjetivo().subtract(meta.getMontoActual());
        if (amount.compareTo(remaining) > 0) {
            throw new RuntimeException("El monto supera lo requerido para completar la meta ($" + remaining + ")");
        }

        meta.setMontoActual(meta.getMontoActual().add(amount));
        Meta updated = metaRepository.save(meta);
        return convertToDTO(updated);
    }

    // Eliminar
    public boolean delete(Long id) {
        if (id != null && metaRepository.existsById(id)) {
            metaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Mapeo Entity -> DTO
    private MetaDTO convertToDTO(Meta meta) {
        MetaDTO dto = new MetaDTO();
        dto.setId(meta.getId());
        dto.setNombre(meta.getNombre());
        dto.setMontoObjetivo(meta.getMontoObjetivo());
        dto.setMontoActual(meta.getMontoActual());
        dto.setFechaLimite(meta.getFechaLimite());
        dto.setUsuarioId(meta.getUsuario().getId());
        dto.setUsuarioNombre(meta.getUsuario().getNombre());
        return dto;
    }
}
