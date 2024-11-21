package com.joaomarques.vitalcare.controller;

import com.joaomarques.vitalcare.domain.entity.EventoEntity;
import com.joaomarques.vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.vitalcare.domain.entity.UsuarioEntity;
import com.joaomarques.vitalcare.domain.service.EventoService;
import com.joaomarques.vitalcare.domain.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    EventoService eventoService;

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/{idUsuario}")
    public ResponseEntity<?> criarEvento(@PathVariable Long idUsuario, @RequestBody EventoEntity evento) {
        try {
            UsuarioEntity usuario = usuarioService.buscarPorId(idUsuario);

            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
            }

            evento.setUsuarioEntity(usuario);

            EventoEntity eventoCriado = eventoService.criarEvento(evento);

            return ResponseEntity.status(HttpStatus.CREATED).body(eventoCriado);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar o evento: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> listarTodosEventos() {
        try {
            List<EventoEntity> eventos = eventoService.listarTodosEventos();

            if (eventos == null || eventos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não há eventos.");
            }

            return ResponseEntity.ok(eventos);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/usuarios/{idUsuario}")
    public ResponseEntity<?> listarEventosPorUsuario(@PathVariable Long idUsuario) {
        try {
            List<EventoEntity> eventos = eventoService.listarEventosPorUsuario(idUsuario);

            if (eventos == null || eventos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Não há eventos para esse usuário.");
            }

            return ResponseEntity.ok(eventos);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> listarEventosPorData(@RequestParam("date") String date) {
        try {
            LocalDate localDate = LocalDate.parse(date);
            List<EventoEntity> eventos = eventoService.listarEventosPorData(localDate);
            return ResponseEntity.ok(eventos);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{idEvento}")
    public ResponseEntity<?> excluirEvento(@PathVariable Long idEvento) {
        try {
            eventoService.excluirEvento(idEvento);
            return ResponseEntity.noContent().build();
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor");
        }
    }

}
