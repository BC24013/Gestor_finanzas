package com.gestorfinanzas.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestorfinanzas.backend.dto.UsuarioDTO;
import com.gestorfinanzas.backend.entity.Categoria;
import com.gestorfinanzas.backend.entity.Usuario;
import com.gestorfinanzas.backend.repository.CategoriaRepository;
import com.gestorfinanzas.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, CategoriaRepository categoriaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
    }

    // Crear usuario
    public UsuarioDTO save(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setGmail(dto.getGmail());
        usuario.setPassword(dto.getPassword());
        usuario.setGenero(dto.getGenero());

        // Asignar categorías (relación N:M)
        if (dto.getCategoriaIds() != null && !dto.getCategoriaIds().isEmpty()) {
            List<Categoria> categorias = categoriaRepository.findAllById(dto.getCategoriaIds());
            usuario.setCategorias(categorias);
        }

        Usuario saved = usuarioRepository.save(usuario);
        return convertToDTO(saved);
    }

    // Listar todos
    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public UsuarioDTO findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
        return convertToDTO(usuario);
    }

    // Actualizar
    public UsuarioDTO update(Long id, UsuarioDTO dto) {
        return usuarioRepository.findById(id).map(existing -> {
            existing.setNombre(dto.getNombre());
            existing.setGmail(dto.getGmail());
            existing.setPassword(dto.getPassword());
            existing.setGenero(dto.getGenero());

            if (dto.getCategoriaIds() != null) {
                List<Categoria> categorias = categoriaRepository.findAllById(dto.getCategoriaIds());
                existing.setCategorias(categorias);
            }

            Usuario updated = usuarioRepository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    // Eliminar
    public boolean delete(Long id) {
        if (id != null && usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Iniciar sesión
    public UsuarioDTO login(String gmail, String password) {
        Usuario usuario = usuarioRepository.findByGmail(gmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el correo: " + gmail));
        if (!usuario.getPassword().equals(password)) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return convertToDTO(usuario);
    }

    // Mapeo Entity -> DTO
    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setGmail(usuario.getGmail());
        dto.setPassword(usuario.getPassword());
        dto.setGenero(usuario.getGenero());

        if (usuario.getCategorias() != null) {
            dto.setCategoriaIds(
                usuario.getCategorias().stream()
                    .map(Categoria::getId)
                    .collect(Collectors.toList())
            );
        }

        return dto;
    }
}
