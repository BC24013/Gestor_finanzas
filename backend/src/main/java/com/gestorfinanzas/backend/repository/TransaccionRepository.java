package com.gestorfinanzas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gestorfinanzas.backend.entity.Transaccion;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
}
