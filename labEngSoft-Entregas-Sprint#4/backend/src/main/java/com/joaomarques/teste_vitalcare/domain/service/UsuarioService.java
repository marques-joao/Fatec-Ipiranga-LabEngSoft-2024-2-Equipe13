package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.entity.ChamadaSOSEntity;
import com.joaomarques.teste_vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.repository.ChamadaSOSRepository;
import com.joaomarques.teste_vitalcare.domain.repository.UsuarioRepository;
import com.joaomarques.teste_vitalcare.dto.UsuarioDTO;
import com.joaomarques.teste_vitalcare.dto.request.LoginRequestDTO;
import com.joaomarques.teste_vitalcare.dto.request.RegisterRequestDTO;
import com.joaomarques.teste_vitalcare.dto.response.ChamadaSOSResponseDTO;
import com.joaomarques.teste_vitalcare.dto.response.LoginResponseDTO;
import com.joaomarques.teste_vitalcare.dto.response.RegisterResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ChamadaSOSRepository chamadaSOSRepository;

    @Autowired
    private WhatsAppService whatsAppService;

    public RegisterResponseDTO realizarCadastro(RegisterRequestDTO registerRequestDTO) {
        try {
            Optional<UsuarioEntity> usuarioEntity = this.usuarioRepository.findByEmail(
                    registerRequestDTO.getEmail()
            );

            if (usuarioEntity.isEmpty()) {
                UsuarioEntity newUsuarioEntity = new UsuarioEntity();

                newUsuarioEntity.setNome(registerRequestDTO.getNomeCompleto());
                newUsuarioEntity.setEmail(registerRequestDTO.getEmail());
                newUsuarioEntity.setSenha(registerRequestDTO.getSenha());
                newUsuarioEntity.setContatoEmergencia(registerRequestDTO.getContatoEmergencia());

                this.usuarioRepository.save(newUsuarioEntity);

                return new RegisterResponseDTO("SUCCESS", "Cadastro realizado com sucesso", newUsuarioEntity);
            }

            return new RegisterResponseDTO("FAILED", "E-mail já cadastrado", null);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }

    }

    public LoginResponseDTO realizarLogin(LoginRequestDTO loginRequestDTO) {
        try {
            UsuarioEntity usuarioEntity = this.usuarioRepository.findByEmail(
                    loginRequestDTO.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + loginRequestDTO.getEmail())
            );

            if (loginRequestDTO.getSenha().equals(usuarioEntity.getSenha())) {
                UsuarioDTO usuarioDTO = new UsuarioDTO(
                        usuarioEntity.getIdUsuario(),
                        usuarioEntity.getNome(),
                        usuarioEntity.getEmail(),
                        usuarioEntity.getContatoEmergencia()
                );
                return new LoginResponseDTO("SUCCESS", "Login realizado com sucesso", usuarioDTO);
            } else {
                return new LoginResponseDTO("FAILED", "Senha incorreta", null);
            }
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public ChamadaSOSResponseDTO acionarSOS(Long idUsuario) {
        try {
            UsuarioEntity usuarioEntity = this.usuarioRepository.findById(
                    idUsuario).orElseThrow(() -> new RuntimeException("Usuário não encontrado.")
            );

            if (usuarioEntity.getContatoEmergencia() != null && !usuarioEntity.getContatoEmergencia().isEmpty()) {
                whatsAppService.enviarMensagem(
                        usuarioEntity.getContatoEmergencia(),
                        "Alerta de emergência emitido. Verifique a situação!\n" +
                                  "Solicitante: " + usuarioEntity.getNome()
                );
            } else {
                throw new RuntimeException("Contato de emergência não definido para o usuário " + usuarioEntity.getNome());
            }

            ChamadaSOSEntity chamadaSOSEntity = new ChamadaSOSEntity();

            chamadaSOSEntity.setUsuarioEntity(usuarioEntity);
            chamadaSOSEntity.setDataHora(LocalDateTime.now());

            chamadaSOSRepository.save(chamadaSOSEntity);

            return new ChamadaSOSResponseDTO(
                chamadaSOSEntity.getIdChamadaSOS(),
                chamadaSOSEntity.getDataHora(),
                chamadaSOSEntity.getUsuarioEntity().getIdUsuario()
            );
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

}