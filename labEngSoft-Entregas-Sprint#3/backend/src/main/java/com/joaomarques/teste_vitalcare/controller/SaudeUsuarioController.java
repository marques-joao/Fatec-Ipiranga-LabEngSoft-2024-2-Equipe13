package com.joaomarques.teste_vitalcare.controller;

import com.joaomarques.teste_vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.teste_vitalcare.domain.service.SaudeUsuarioService;
import com.joaomarques.teste_vitalcare.dto.request.SaudeUsuarioRequestDTO;
import com.joaomarques.teste_vitalcare.dto.response.SaudeUsuarioResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/saude")
public class SaudeUsuarioController {

    @Autowired
    private SaudeUsuarioService saudeUsuarioService;

    @PostMapping("/{idUsuario}")
    public ResponseEntity<SaudeUsuarioResponseDTO> adicionarDadosSaude(@PathVariable Long idUsuario, @RequestBody SaudeUsuarioRequestDTO saudeUsuario) {
        SaudeUsuarioEntity saudeUsuarioEntity = new SaudeUsuarioEntity();

        saudeUsuarioEntity.setTipoSanguineo(saudeUsuario.getTipoSanguineo());
        saudeUsuarioEntity.setOxigenacao(saudeUsuario.getOxigenacao());
        saudeUsuarioEntity.setBatimento(saudeUsuario.getBatimento());
        saudeUsuarioEntity.setIst(saudeUsuario.getIst());
        saudeUsuarioEntity.setAlergias(saudeUsuario.getAlergias());
        saudeUsuarioEntity.setDoencas(saudeUsuario.getDoencas());
        saudeUsuarioEntity.setMedicamentos(saudeUsuario.getMedicamentos());

        SaudeUsuarioEntity novaSaude = saudeUsuarioService.adicionarDadosSaude(idUsuario, saudeUsuarioEntity);

        SaudeUsuarioResponseDTO response = new SaudeUsuarioResponseDTO();

        response.setIdSaude(novaSaude.getIdSaude());
        response.setTipoSanguineo(novaSaude.getTipoSanguineo());
        response.setOxigenacao(novaSaude.getOxigenacao());
        response.setBatimento(novaSaude.getBatimento());
        response.setIst(novaSaude.getIst());
        response.setAlergias(novaSaude.getAlergias());
        response.setDoencas(novaSaude.getDoencas());
        response.setMedicamentos(novaSaude.getMedicamentos());
        response.setIdUsuario(idUsuario);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{idSaude}")
    public ResponseEntity<SaudeUsuarioResponseDTO> obterDadosSaude(@PathVariable Long idSaude) {
        Optional<SaudeUsuarioEntity> saudeUsuarioOpt = saudeUsuarioService.obterDadosSaude(idSaude);

        if (saudeUsuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SaudeUsuarioEntity saudeUsuario = saudeUsuarioOpt.get();

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

        return ResponseEntity.ok(response);
    }


    @GetMapping("/usuarios/{idUsuario}")
    public ResponseEntity<List<SaudeUsuarioResponseDTO>> listarDadosSaudePorUsuario(@PathVariable Long idUsuario) {
        List<SaudeUsuarioResponseDTO> saudeUsuarios = saudeUsuarioService.listarDadosSaudePorUsuario(idUsuario);
        return ResponseEntity.ok(saudeUsuarios);
    }

    @PutMapping("/{idSaude}")
    public ResponseEntity<SaudeUsuarioResponseDTO> atualizarDadosSaude(
            @PathVariable Long idSaude,
            @RequestBody SaudeUsuarioRequestDTO saudeAtualizadaRequest) {

        Optional<SaudeUsuarioEntity> saudeExistenteOpt = saudeUsuarioService.obterDadosSaude(idSaude);

        if (saudeExistenteOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SaudeUsuarioEntity saudeExistente = saudeExistenteOpt.get();

        saudeExistente.setTipoSanguineo(saudeAtualizadaRequest.getTipoSanguineo());
        saudeExistente.setOxigenacao(saudeAtualizadaRequest.getOxigenacao());
        saudeExistente.setBatimento(saudeAtualizadaRequest.getBatimento());
        saudeExistente.setIst(saudeAtualizadaRequest.getIst());
        saudeExistente.setAlergias(saudeAtualizadaRequest.getAlergias());
        saudeExistente.setDoencas(saudeAtualizadaRequest.getDoencas());
        saudeExistente.setMedicamentos(saudeAtualizadaRequest.getMedicamentos());

        SaudeUsuarioEntity saudeAtualizada = saudeUsuarioService.atualizarDadosSaude(saudeExistente);

        SaudeUsuarioResponseDTO response = new SaudeUsuarioResponseDTO();
        response.setIdSaude(saudeAtualizada.getIdSaude());
        response.setTipoSanguineo(saudeAtualizada.getTipoSanguineo());
        response.setOxigenacao(saudeAtualizada.getOxigenacao());
        response.setBatimento(saudeAtualizada.getBatimento());
        response.setIst(saudeAtualizada.getIst());
        response.setAlergias(saudeAtualizada.getAlergias());
        response.setDoencas(saudeAtualizada.getDoencas());
        response.setMedicamentos(saudeAtualizada.getMedicamentos());
        response.setIdUsuario(saudeAtualizada.getUsuarioEntity().getIdUsuario());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idSaude}")
    public ResponseEntity<Void> excluirDadosSaude(@PathVariable Long idSaude) {
        saudeUsuarioService.excluirDadosSaude(idSaude);
        return ResponseEntity.noContent().build();
    }

}
