package com.joaomarques.vitalcare.domain.entity;

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
@Table(name = "tb_usuario")
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUsuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String contatoEmergencia;

    @OneToMany(mappedBy = "usuarioEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChamadaSOSEntity> chamadasSOS;

    @OneToMany(mappedBy = "usuarioEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SaudeUsuarioEntity> saudeUsuario;

//    @OneToOne(mappedBy = "usuarioEntity", cascade = CascadeType.ALL, orphanRemoval = true)
//    private AgendaEntity agendaEntity;

    @OneToMany(mappedBy = "usuarioEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventoEntity> eventos;

    public UsuarioEntity(Long idUsuario, String nome, String email, String contatoEmergencia) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.contatoEmergencia = contatoEmergencia;
    }
}