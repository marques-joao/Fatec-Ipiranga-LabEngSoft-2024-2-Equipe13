package com.joaomarques.vitalcare.controller;

import com.joaomarques.vitalcare.domain.service.UsuarioService;
import com.joaomarques.vitalcare.dto.request.LoginRequestDTO;
import com.joaomarques.vitalcare.dto.request.RegisterRequestDTO;
import com.joaomarques.vitalcare.dto.response.ChamadaSOSResponseDTO;
import com.joaomarques.vitalcare.dto.response.LoginResponseDTO;
import com.joaomarques.vitalcare.dto.response.RegisterResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<RegisterResponseDTO> adicionarUsuario(@RequestBody RegisterRequestDTO registerRequestDTO) {
        RegisterResponseDTO response = usuarioService.realizarCadastro(registerRequestDTO);

        if ("SUCCESS".equals(response.getStatus())) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> realizarLogin(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            LoginResponseDTO response = usuarioService.realizarLogin(loginRequestDTO);

            if (response.getData() == null) {
                return ResponseEntity.status(HttpStatus.OK).body(new LoginResponseDTO(response.getStatus(), response.getMessage(), null));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponseDTO("FAILED", "Erro interno no servidor", null));
        }

    }

    @PostMapping("/{idUsuario}/sos")
    public ChamadaSOSResponseDTO acionarSOS(@PathVariable Long idUsuario) {
        return usuarioService.acionarSOS(idUsuario);
    }

    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<?> deletarConta(@PathVariable Long idUsuario) {
        try {
            usuarioService.deletarConta(idUsuario);

            return ResponseEntity.noContent().build();
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor");
        }
    }

}