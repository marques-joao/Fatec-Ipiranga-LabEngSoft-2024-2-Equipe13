package com.joaomarques.vitalcare.domain.repository;

import com.joaomarques.vitalcare.domain.entity.EventoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<EventoEntity, Long> {}