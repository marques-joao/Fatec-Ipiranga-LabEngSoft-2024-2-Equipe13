package com.joaomarques.teste_vitalcare.controller;

import com.joaomarques.teste_vitalcare.domain.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

    @Autowired
    AgendaService agendaService;

}