package com.joaomarques.vitalcare.domain.service;

import com.joaomarques.vitalcare.domain.entity.EventoEntity;
import com.joaomarques.vitalcare.domain.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

//    public EventoEntity adicionarEventoNaAgenda(AgendaEntity agenda, EventoEntity evento) {
//        try {
//            evento.setAgendaEntity(agenda);
//            return eventoRepository.save(evento);
//        } catch(Exception e) {
//            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
//            return null;
//        }
//    }

//    public EventoEntity criarEvento(EventoEntity evento) {
//        try {
//
//        } catch(Exception e) {
//            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
//            return null;
//        }
//    }

    public EventoEntity buscarEvento(Long idEvento) {
        try {
            return eventoRepository.findById(idEvento)
                    .orElseThrow(() -> new IllegalArgumentException("Evento não encontrado: " + idEvento));
        } catch(Exception e) {
            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
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
