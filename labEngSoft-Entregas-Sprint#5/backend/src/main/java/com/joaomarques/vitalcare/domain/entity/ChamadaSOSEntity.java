package com.joaomarques.vitalcare.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_chamada_sos")
public class ChamadaSOSEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idChamadaSOS;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idUsuario", nullable = false)
    private UsuarioEntity usuarioEntity;

}