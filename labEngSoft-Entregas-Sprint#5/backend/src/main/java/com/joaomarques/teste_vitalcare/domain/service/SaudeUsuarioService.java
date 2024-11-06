package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.repository.SaudeUsuarioRepository;
import com.joaomarques.teste_vitalcare.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SaudeUsuarioService {

    @Autowired
    private SaudeUsuarioRepository saudeUsuarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public SaudeUsuarioEntity adicionarDadosSaude(Long idUsuario, SaudeUsuarioEntity saudeUsuario) {
        try {
            UsuarioEntity usuarioEntity = usuarioRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            saudeUsuario.setUsuarioEntity(usuarioEntity);

            return saudeUsuarioRepository.save(saudeUsuario);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public List<SaudeUsuarioEntity> obterTodosDadosSaude() {
        try {
            return saudeUsuarioRepository.findAll();
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public Optional<SaudeUsuarioEntity> obterDadosSaudePorId(Long idSaude) {
        try {
            return saudeUsuarioRepository.findById(idSaude);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return Optional.empty();
        }
    }

    public SaudeUsuarioEntity atualizarDadosSaude(SaudeUsuarioEntity saudeUsuario) {
        try {
            return saudeUsuarioRepository.save(saudeUsuario);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public void excluirDadosSaude(Long idSaude) {
        try {
            saudeUsuarioRepository.deleteById(idSaude);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
        }
    }

    public List<SaudeUsuarioEntity> listarDadosSaudePorUsuario(Long idUsuario) {
        try {
            return saudeUsuarioRepository.findByUsuarioEntityIdUsuario(idUsuario);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

}
