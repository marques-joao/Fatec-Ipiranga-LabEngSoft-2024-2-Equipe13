package com.joaomarques.teste_vitalcare.domain.repository;

import com.joaomarques.teste_vitalcare.domain.entity.ChamadaSOSEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChamadaSOSRepository extends JpaRepository<ChamadaSOSEntity, Long> {}