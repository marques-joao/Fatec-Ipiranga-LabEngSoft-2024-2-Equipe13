package com.joaomarques.vitalcare.controller;

import com.joaomarques.vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.vitalcare.domain.model.Alergia;
import com.joaomarques.vitalcare.domain.model.Doenca;
import com.joaomarques.vitalcare.domain.model.Ist;
import com.joaomarques.vitalcare.domain.model.Medicamento;
import com.joaomarques.vitalcare.domain.service.SaudeUsuarioService;
import com.joaomarques.vitalcare.dto.request.SaudeUsuarioRequestDTO;
import com.joaomarques.vitalcare.dto.response.SaudeUsuarioResponseDTO;
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
        try {
            SaudeUsuarioEntity saudeUsuarioEntity = new SaudeUsuarioEntity();

            saudeUsuarioEntity.setTipoSanguineo(saudeUsuario.getTipoSanguineo());
            saudeUsuarioEntity.setOxigenacao(saudeUsuario.getOxigenacao());
            saudeUsuarioEntity.setBatimento(saudeUsuario.getBatimento());

            saudeUsuarioEntity.setAlergia(new Alergia(saudeUsuario.getAlergias()));
            saudeUsuarioEntity.setDoenca(new Doenca(saudeUsuario.getDoencas()));
            saudeUsuarioEntity.setMedicamento(new Medicamento(saudeUsuario.getMedicamentos()));
            saudeUsuarioEntity.setIst(new Ist(saudeUsuario.getIst()));

            SaudeUsuarioEntity novaSaude = saudeUsuarioService.adicionarDadosSaude(idUsuario, saudeUsuarioEntity);

            SaudeUsuarioResponseDTO response = new SaudeUsuarioResponseDTO();

            response.setIdSaude(novaSaude.getIdSaude());
            response.setTipoSanguineo(novaSaude.getTipoSanguineo());
            response.setOxigenacao(novaSaude.getOxigenacao());
            response.setBatimento(novaSaude.getBatimento());

            response.setAlergias(novaSaude.getAlergia().getAlergias());
            response.setDoencas(novaSaude.getDoenca().getDoencas());
            response.setMedicamentos(novaSaude.getMedicamento().getMedicamentos());
            response.setIst(novaSaude.getIst().getIsts());

            response.setIdUsuario(idUsuario);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public ResponseEntity<?> obterDadosSaude() {
        try {
            List<SaudeUsuarioEntity> dadosSaude = saudeUsuarioService.obterTodosDadosSaude();

            if (dadosSaude == null || dadosSaude.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Os dados de saúde estão vazios.");
            }

            return ResponseEntity.ok(dadosSaude);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/usuarios/{idUsuario}")
    public ResponseEntity<?> listarDadosSaudePorUsuario(@PathVariable Long idUsuario) {
        try {
            List<SaudeUsuarioEntity> dadosSaude = saudeUsuarioService.listarDadosSaudePorUsuario(idUsuario);

            if (dadosSaude == null || dadosSaude.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados de saúde não encontrados para esse usuário.");
            }

            return ResponseEntity.ok(dadosSaude);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{idSaude}")
    public ResponseEntity<?> atualizarDadosSaude(@PathVariable Long idSaude, @RequestBody SaudeUsuarioRequestDTO saudeAtualizadaRequest) {

        try {
            Optional<SaudeUsuarioEntity> saudeExistenteOpt = saudeUsuarioService.obterDadosSaudePorId(idSaude);

            if (saudeExistenteOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados de saúde não encontrados.");
            }

            SaudeUsuarioEntity saudeExistente = saudeExistenteOpt.get();

            saudeExistente.setTipoSanguineo(saudeAtualizadaRequest.getTipoSanguineo());
            saudeExistente.setOxigenacao(saudeAtualizadaRequest.getOxigenacao());
            saudeExistente.setBatimento(saudeAtualizadaRequest.getBatimento());
            saudeExistente.setIst(new Ist(saudeAtualizadaRequest.getIst()));
            saudeExistente.setAlergia(new Alergia(saudeAtualizadaRequest.getAlergias()));
            saudeExistente.setDoenca(new Doenca(saudeAtualizadaRequest.getDoencas()));
            saudeExistente.setMedicamento(new Medicamento(saudeAtualizadaRequest.getMedicamentos()));

            SaudeUsuarioEntity saudeAtualizada = saudeUsuarioService.atualizarDadosSaude(saudeExistente);

            SaudeUsuarioResponseDTO response = new SaudeUsuarioResponseDTO();
            response.setIdSaude(saudeAtualizada.getIdSaude());
            response.setTipoSanguineo(saudeAtualizada.getTipoSanguineo());
            response.setOxigenacao(saudeAtualizada.getOxigenacao());
            response.setBatimento(saudeAtualizada.getBatimento());
            response.setIst(saudeAtualizada.getIst().getIsts());
            response.setAlergias(saudeAtualizada.getAlergia().getAlergias());
            response.setDoencas(saudeAtualizada.getDoenca().getDoencas());
            response.setMedicamentos(saudeAtualizada.getMedicamento().getMedicamentos());
            response.setIdUsuario(saudeAtualizada.getUsuarioEntity().getIdUsuario());

            return ResponseEntity.ok(response);

        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/{idSaude}")
    public ResponseEntity<Void> excluirDadosSaude(@PathVariable Long idSaude) {
        saudeUsuarioService.excluirDadosSaude(idSaude);
        return ResponseEntity.noContent().build();
    }

}
