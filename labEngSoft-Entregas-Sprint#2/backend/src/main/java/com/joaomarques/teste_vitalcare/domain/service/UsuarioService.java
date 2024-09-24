package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.repository.UsuarioRepository;
import com.joaomarques.teste_vitalcare.dto.request.LoginRequestDTO;
import com.joaomarques.teste_vitalcare.dto.request.RegisterRequestDTO;
import com.joaomarques.teste_vitalcare.dto.response.LoginResponseDTO;
import com.joaomarques.teste_vitalcare.dto.UsuarioDTO;
import com.joaomarques.teste_vitalcare.dto.response.RegisterResponseDTO;
import com.joaomarques.teste_vitalcare.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

//    public UsuarioDTO adicionarUsuario(UsuarioDTO usuarioDTO) {
//        UsuarioEntity usuarioEntity = UsuarioMapper.mapToUsuarioEntity(usuarioDTO);
//
//        UsuarioEntity usuarioSalvo = usuarioRepository.save(usuarioEntity);
//
//        return UsuarioMapper.mapToUsuarioDTO(usuarioSalvo);
//    }

    public RegisterResponseDTO adicionarUsuario(RegisterRequestDTO registerRequestDTO) {
        Optional<UsuarioEntity> usuarioEntity = this.usuarioRepository.findByEmail(
                registerRequestDTO.getEmail()
        );

        if (usuarioEntity.isEmpty()) {
            UsuarioEntity newUsuarioEntity = new UsuarioEntity();

            newUsuarioEntity.setNome(registerRequestDTO.getNomeCompleto());
            newUsuarioEntity.setEmail(registerRequestDTO.getEmail());
            newUsuarioEntity.setSenha(registerRequestDTO.getSenha());

            this.usuarioRepository.save(newUsuarioEntity);

            return new RegisterResponseDTO("SUCCESS", "Cadastro realizado com sucesso", newUsuarioEntity);
        }

        return new RegisterResponseDTO("FAILED", "Cadastro inválido", null);
    }

    public LoginResponseDTO realizarLogin(LoginRequestDTO loginRequestDTO) {
        UsuarioEntity usuarioEntity = this.usuarioRepository.findByEmail(
                loginRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + loginRequestDTO.getEmail())
        );

        if (loginRequestDTO.getSenha().equals(usuarioEntity.getSenha())) {
            return new LoginResponseDTO("SUCCESS", "Login realizado com sucesso", usuarioEntity);
        } else {
            return new LoginResponseDTO("FAILED", "Senha incorreta", null);
        }
    }
}