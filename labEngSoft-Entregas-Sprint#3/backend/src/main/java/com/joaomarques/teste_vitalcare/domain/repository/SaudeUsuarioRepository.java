package com.joaomarques.teste_vitalcare.domain.repository;

import com.joaomarques.teste_vitalcare.domain.entity.SaudeUsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaudeUsuarioRepository extends JpaRepository<SaudeUsuarioEntity, Long> {
    List<SaudeUsuarioEntity> findByUsuarioEntityIdUsuario(Long idUsuario);
}