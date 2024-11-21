package com.joaomarques.vitalcare.mapper;

import com.joaomarques.vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.vitalcare.dto.UsuarioDTO;

public class UsuarioMapper {

    public static UsuarioDTO mapToUsuarioDTO(UsuarioEntity usuarioEntity) {
        return new UsuarioDTO(
                usuarioEntity.getIdUsuario(),
                usuarioEntity.getNome(),
                usuarioEntity.getEmail(),
                usuarioEntity.getContatoEmergencia(),
                usuarioEntity.getNomeContatoEmergencia()
        );
    }

    public static UsuarioEntity mapToUsuarioEntity(UsuarioDTO usuarioDTO) {
        return new UsuarioEntity(
                usuarioDTO.getIdUsuario(),
                usuarioDTO.getNome(),
                usuarioDTO.getEmail(),
                usuarioDTO.getContatoEmergencia(),
                usuarioDTO.getNomeContatoEmergencia()
        );
    }

}