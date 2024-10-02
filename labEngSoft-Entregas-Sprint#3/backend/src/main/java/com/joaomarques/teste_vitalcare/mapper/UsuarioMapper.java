package com.joaomarques.teste_vitalcare.mapper;

import com.joaomarques.teste_vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.teste_vitalcare.dto.UsuarioDTO;

public class UsuarioMapper {

    public static UsuarioDTO mapToUsuarioDTO(UsuarioEntity usuarioEntity) {
        return new UsuarioDTO(
                usuarioEntity.getIdUsuario(),
                usuarioEntity.getNome(),
                usuarioEntity.getEmail(),
                usuarioEntity.getContatoEmergencia()
        );
    }

    public static UsuarioEntity mapToUsuarioEntity(UsuarioDTO usuarioDTO) {
        return new UsuarioEntity(
                usuarioDTO.getIdUsuario(),
                usuarioDTO.getNome(),
                usuarioDTO.getEmail(),
                usuarioDTO.getContatoEmergencia()
        );
    }

}