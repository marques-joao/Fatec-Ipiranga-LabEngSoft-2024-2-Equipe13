package com.joaomarques.teste_vitalcare.domain.repository;

import com.joaomarques.teste_vitalcare.domain.entity.EventoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<EventoEntity, Long> {}