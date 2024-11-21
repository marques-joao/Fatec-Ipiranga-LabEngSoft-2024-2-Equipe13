package com.joaomarques.vitalcare.domain.service;

import com.joaomarques.vitalcare.domain.entity.EventoEntity;
import com.joaomarques.vitalcare.domain.entity.SaudeUsuarioEntity;
import com.joaomarques.vitalcare.domain.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    public EventoEntity criarEvento(EventoEntity evento) {
        try {
            if (evento.getNome() == null || evento.getNome().isEmpty()) {
                throw new IllegalArgumentException("O nome do evento é obrigatório.");
            }
            if (evento.getData() == null) {
                throw new IllegalArgumentException("A data do evento é obrigatória.");
            }
            if (evento.getHorario() == null) {
                throw new IllegalArgumentException("O horário do evento é obrigatório.");
            }

            evento.setHorarioLembrete(evento.getLembrete());

            return eventoRepository.save(evento);

        } catch (IllegalArgumentException e) {
            System.err.println("Erro de validação: " + e.getMessage());
            return null;

        } catch (Exception e) {
            System.err.println("Erro ao criar o evento: " + e.getMessage());
            return null;
        }
    }

    public List<EventoEntity> listarTodosEventos() {
        try {
            return eventoRepository.findAll();
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public List<EventoEntity> listarEventosPorUsuario(Long idUsuario) {
        try {
            return eventoRepository.findByUsuarioEntityIdUsuario(idUsuario);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public List<EventoEntity> listarEventosPorData(LocalDate data) {
        try {
            return eventoRepository.findByData(data);
        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public void excluirEvento(Long idEvento) {
        try {
            eventoRepository.deleteById(idEvento);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
        }
    }

}
