package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.repository.SaudeUsuarioRepository;
import com.joaomarques.teste_vitalcare.domain.repository.UsuarioRepository;
import com.joaomarques.teste_vitalcare.dto.response.SaudeUsuarioResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SaudeUsuarioService {

    @Autowired
    private SaudeUsuarioRepository saudeUsuarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public SaudeUsuarioEntity adicionarDadosSaude(Long idUsuario, SaudeUsuarioEntity saudeUsuario) {
        UsuarioEntity usuarioEntity = usuarioRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        saudeUsuario.setUsuarioEntity(usuarioEntity);

        return saudeUsuarioRepository.save(saudeUsuario);
    }

    @Transactional
    public Optional<SaudeUsuarioEntity> obterDadosSaude(Long idSaude) {
        Optional<SaudeUsuarioEntity> saudeUsuarioOpt = saudeUsuarioRepository.findById(idSaude);

        saudeUsuarioOpt.ifPresent(saudeUsuario -> {
            saudeUsuario.getAlergias().size();
            saudeUsuario.getDoencas().size();
            saudeUsuario.getMedicamentos().size();
        });

        return saudeUsuarioOpt;
    }


    public SaudeUsuarioEntity atualizarDadosSaude(SaudeUsuarioEntity saudeUsuario) {
        return saudeUsuarioRepository.save(saudeUsuario);
    }

    public void excluirDadosSaude(Long idSaude) {
        saudeUsuarioRepository.deleteById(idSaude);
    }

    @Transactional
    public List<SaudeUsuarioResponseDTO> listarDadosSaudePorUsuario(Long idUsuario) {
        List<SaudeUsuarioEntity> saudeUsuarioEntities = saudeUsuarioRepository.findByUsuarioEntityIdUsuario(idUsuario);

        return saudeUsuarioEntities.stream().map(saudeUsuario -> {
            saudeUsuario.getAlergias().size();
            saudeUsuario.getDoencas().size();
            saudeUsuario.getMedicamentos().size();

            SaudeUsuarioResponseDTO response = new SaudeUsuarioResponseDTO();
            response.setIdSaude(saudeUsuario.getIdSaude());
            response.setTipoSanguineo(saudeUsuario.getTipoSanguineo());
            response.setOxigenacao(saudeUsuario.getOxigenacao());
            response.setBatimento(saudeUsuario.getBatimento());
            response.setIst(saudeUsuario.getIst());
            response.setAlergias(saudeUsuario.getAlergias());
            response.setDoencas(saudeUsuario.getDoencas());
            response.setMedicamentos(saudeUsuario.getMedicamentos());
            response.setIdUsuario(saudeUsuario.getUsuarioEntity().getIdUsuario());

            return response;
        }).collect(Collectors.toList());
    }

}
