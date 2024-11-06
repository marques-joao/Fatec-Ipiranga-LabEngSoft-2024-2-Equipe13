package com.joaomarques.teste_vitalcare.domain.service;

import com.joaomarques.teste_vitalcare.domain.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgendaService {

    @Autowired
    AgendaRepository agendaRepository;

}
