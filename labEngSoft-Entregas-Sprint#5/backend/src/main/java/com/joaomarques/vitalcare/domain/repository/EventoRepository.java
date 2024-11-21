package com.joaomarques.vitalcare.domain.repository;

import com.joaomarques.vitalcare.domain.entity.EventoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<EventoEntity, Long> {
    List<EventoEntity> findByUsuarioEntityIdUsuario(Long idUsuario);
    List<EventoEntity> findByData(LocalDate data);
}