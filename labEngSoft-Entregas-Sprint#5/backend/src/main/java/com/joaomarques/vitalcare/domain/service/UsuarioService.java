package com.joaomarques.vitalcare.domain.service;

import com.joaomarques.vitalcare.domain.entity.ChamadaSOSEntity;
import com.joaomarques.vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.vitalcare.domain.repository.ChamadaSOSRepository;
import com.joaomarques.vitalcare.domain.repository.UsuarioRepository;
import com.joaomarques.vitalcare.dto.UsuarioDTO;
import com.joaomarques.vitalcare.dto.request.LoginRequestDTO;
import com.joaomarques.vitalcare.dto.request.RegisterRequestDTO;
import com.joaomarques.vitalcare.dto.response.ChamadaSOSResponseDTO;
import com.joaomarques.vitalcare.dto.response.LoginResponseDTO;
import com.joaomarques.vitalcare.dto.response.RegisterResponseDTO;
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
                newUsuarioEntity.setNomeContatoEmergencia(registerRequestDTO.getNomeContatoEmergencia());

                this.usuarioRepository.save(newUsuarioEntity);

                return new RegisterResponseDTO("SUCCESS", "Cadastro realizado com sucesso", newUsuarioEntity);
            }

            return new RegisterResponseDTO("FAILED", "E-mail já cadastrado", null);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }

    }

    public RegisterResponseDTO atualizarCadastro(RegisterRequestDTO registerRequestDTO, Long idUsuario) {
        try {
            Optional<UsuarioEntity> usuarioEntityOptional = this.usuarioRepository.findById(
                    idUsuario
            );

            if (usuarioEntityOptional.isPresent()) {
                UsuarioEntity usuarioEntity = usuarioEntityOptional.get();

                usuarioEntity.setNome(registerRequestDTO.getNomeCompleto());
                usuarioEntity.setSenha(registerRequestDTO.getSenha());
                usuarioEntity.setEmail(registerRequestDTO.getEmail());
                usuarioEntity.setContatoEmergencia(registerRequestDTO.getContatoEmergencia());
                usuarioEntity.setNomeContatoEmergencia(registerRequestDTO.getNomeContatoEmergencia());

                this.usuarioRepository.save(usuarioEntity);

                return new RegisterResponseDTO("SUCCESS", "Cadastro atualizado com sucesso", usuarioEntity);
            }

            return new RegisterResponseDTO("FAILED", "Usuário não encontrado", null);
        } catch (Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public LoginResponseDTO realizarLogin(LoginRequestDTO loginRequestDTO) {
        try {
            Optional<UsuarioEntity> usuarioEntityOpt = this.usuarioRepository.findByEmail(loginRequestDTO.getEmail());

            if (usuarioEntityOpt.isEmpty()) {
                return new LoginResponseDTO("FAILED", "Usuário não encontrado", null);
            }

            UsuarioEntity usuarioEntity = usuarioEntityOpt.get();

            if (loginRequestDTO.getSenha().equals(usuarioEntity.getSenha())) {
                UsuarioDTO usuarioDTO = new UsuarioDTO(
                        usuarioEntity.getIdUsuario(),
                        usuarioEntity.getNome(),
                        usuarioEntity.getEmail(),
                        usuarioEntity.getContatoEmergencia(),
                        usuarioEntity.getNomeContatoEmergencia()
                );

                return new LoginResponseDTO("SUCCESS", "Login realizado com sucesso", usuarioDTO);
            } else {
                return new LoginResponseDTO("FAILED", "Senha incorreta", null);
            }
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
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
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public UsuarioEntity buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public void deletarConta(Long idUsuario) {
        try {
            usuarioRepository.deleteById(idUsuario);
        }catch (Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
        }
    }

}