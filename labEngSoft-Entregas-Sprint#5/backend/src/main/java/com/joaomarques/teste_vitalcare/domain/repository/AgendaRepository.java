package com.joaomarques.teste_vitalcare.domain.repository;

import com.joaomarques.teste_vitalcare.domain.entity.AgendaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaRepository extends JpaRepository<AgendaEntity, Long> {}