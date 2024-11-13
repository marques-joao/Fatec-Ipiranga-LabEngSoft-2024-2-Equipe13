package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.entity.AgendaEntity;
import com.joaomarques.teste_vitalcare.domain.entity.EventoEntity;
import com.joaomarques.teste_vitalcare.domain.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendaService {

    @Autowired
    AgendaRepository agendaRepository;

    @Autowired
    EventoService eventoService;

    public EventoEntity criarEvento(Long idUsuario, EventoEntity evento) {
        try {
            AgendaEntity agenda = agendaRepository.findByUsuarioEntityId(idUsuario)
                    .orElseThrow(() -> new IllegalArgumentException("Agenda não encontrada para o usuário: " + idUsuario));

            return eventoService.adicionarEventoNaAgenda(agenda, evento);
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

    public List<EventoEntity> listarEventos(Long idUsuario) {
        try {
            AgendaEntity agenda = agendaRepository.findByUsuarioEntityId(idUsuario)
                    .orElseThrow(() -> new IllegalArgumentException("Agenda não encontrada para o usuário: " + idUsuario));

            return agenda.getEventos();
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
            return null;
        }
    }

}
