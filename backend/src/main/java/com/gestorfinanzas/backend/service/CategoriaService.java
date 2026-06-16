package com.gestorfinanzas.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestorfinanzas.backend.dto.CategoriaDTO;
import com.gestorfinanzas.backend.entity.Categoria;
import com.gestorfinanzas.backend.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    // Crear categoría
    public CategoriaDTO save(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setTipo(dto.getTipo());

        Categoria saved = categoriaRepository.save(categoria);
        return convertToDTO(saved);
    }

    // Listar todas
    public List<CategoriaDTO> findAll() {
        return categoriaRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public CategoriaDTO findById(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
        return convertToDTO(categoria);
    }

    // Actualizar
    public CategoriaDTO update(Long id, CategoriaDTO dto) {
        return categoriaRepository.findById(id).map(existing -> {
            existing.setNombre(dto.getNombre());
            existing.setDescripcion(dto.getDescripcion());
            existing.setTipo(dto.getTipo());

            Categoria updated = categoriaRepository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }

    // Eliminar
    public boolean delete(Long id) {
        if (id != null && categoriaRepository.existsById(id)) {
            categoriaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Mapeo Entity -> DTO
    private CategoriaDTO convertToDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setDescripcion(categoria.getDescripcion());
        dto.setTipo(categoria.getTipo());
        return dto;
    }
}
