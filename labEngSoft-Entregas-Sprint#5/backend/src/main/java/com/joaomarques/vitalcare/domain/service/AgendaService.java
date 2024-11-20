package com.joaomarques.vitalcare.domain.service;

//@Service
public class AgendaService {

//    @Autowired
//    AgendaRepository agendaRepository;
//
//    @Autowired
//    EventoService eventoService;
//
//    public EventoEntity criarEvento(Long idUsuario, EventoEntity evento) {
//        try {
//            AgendaEntity agenda = agendaRepository.findByUsuarioEntityId(idUsuario)
//                    .orElseThrow(() -> new IllegalArgumentException("Agenda não encontrada para o usuário: " + idUsuario));
//
//            return eventoService.adicionarEventoNaAgenda(agenda, evento);
//        } catch(Exception e) {
//            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
//            return null;
//        }
//    }
//
//    public List<EventoEntity> listarEventos(Long idUsuario) {
//        try {
//            AgendaEntity agenda = agendaRepository.findByUsuarioEntityId(idUsuario)
//                    .orElseThrow(() -> new IllegalArgumentException("Agenda não encontrada para o usuário: " + idUsuario));
//
//            return agenda.getEventos();
//        } catch(Exception e) {
//            System.out.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
//            return null;
//        }
//    }

}
