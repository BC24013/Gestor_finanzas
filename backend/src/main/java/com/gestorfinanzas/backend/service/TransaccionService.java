package com.gestorfinanzas.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestorfinanzas.backend.dto.TransaccionDTO;
import com.gestorfinanzas.backend.entity.Categoria;
import com.gestorfinanzas.backend.entity.Transaccion;
import com.gestorfinanzas.backend.entity.Usuario;
import com.gestorfinanzas.backend.repository.CategoriaRepository;
import com.gestorfinanzas.backend.repository.TransaccionRepository;
import com.gestorfinanzas.backend.repository.UsuarioRepository;

@Service
public class TransaccionService {

    private final TransaccionRepository transaccionRepository;
    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    // Inyeccion de dependencias
    public TransaccionService(TransaccionRepository transaccionRepository, UsuarioRepository usuarioRepository, CategoriaRepository categoriaRepository){
        this.transaccionRepository = transaccionRepository;
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    //Crear - Create
    public TransaccionDTO save(TransaccionDTO dto){
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado con ID: " + dto.getUsuarioId()));
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId()).orElseThrow(() -> new RuntimeException("Error: Categoría no encontrada con ID: " + dto.getCategoriaId()));

        Transaccion transaccion = new Transaccion();
        transaccion.setDescripcion(dto.getDescripcion());
        transaccion.setMonto(dto.getMonto());
        transaccion.setFecha(dto.getFecha());
        transaccion.setTipo(dto.getTipo());
        transaccion.setUsuario(usuario);
        transaccion.setCategoria(categoria);

        Transaccion savedTransaccion = transaccionRepository.save(transaccion);
        dto.setId(savedTransaccion.getId());
        return dto;
    }

    //Leer - Read
    public List<TransaccionDTO> findAll(){
        return transaccionRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Buscar por ID - Read single
    public TransaccionDTO findById(Long id) {
        Transaccion transaccion = transaccionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transacción no encontrada con ID: " + id));
        return convertToDTO(transaccion);
    }

    //Actualizar - Update
    public TransaccionDTO update(Long id, TransaccionDTO dto) {
        return transaccionRepository.findById(id).map(existing -> {
            existing.setDescripcion(dto.getDescripcion());
            existing.setMonto(dto.getMonto());
            existing.setFecha(dto.getFecha());
            existing.setTipo(dto.getTipo());
            // Comprobacion de existencia de usuario/categoria
            existing.setUsuario(usuarioRepository.findById(dto.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuario no encontrado")));
            existing.setCategoria(categoriaRepository.findById(dto.getCategoriaId()).orElseThrow(() -> new RuntimeException("Categoría no encontrada")));
            Transaccion updated = transaccionRepository.save(existing);
            
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Transacción original no encontrada"));
    }

    //Borrar - Delete
    public boolean delete(Long id) {
        if (id != null && transaccionRepository.existsById(id)) {
            transaccionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    //Metodo auxiliar de mapeo
    private TransaccionDTO convertToDTO(Transaccion transaccion) {
        TransaccionDTO dto = new TransaccionDTO();
        dto.setId(transaccion.getId());
        dto.setDescripcion(transaccion.getDescripcion());
        dto.setMonto(transaccion.getMonto());
        dto.setFecha(transaccion.getFecha());
        dto.setTipo(transaccion.getTipo());
        dto.setUsuarioId(transaccion.getUsuario().getId());
        dto.setCategoriaId(transaccion.getCategoria().getId());
        return dto;
    }
}

