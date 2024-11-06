package com.joaomarques.teste_vitalcare.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_agenda")
public class AgendaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAgenda;

    @OneToMany(mappedBy = "agendaEntity")
    private List<EventoEntity> eventos;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "idUsuario", nullable = false)
    private UsuarioEntity usuarioEntity;

}