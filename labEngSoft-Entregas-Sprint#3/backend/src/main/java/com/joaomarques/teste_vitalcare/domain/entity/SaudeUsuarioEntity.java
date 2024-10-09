package com.joaomarques.teste_vitalcare.domain.entity;

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
@Table(name = "tb_saude_usuario")
public class SaudeUsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idSaude;

    @ElementCollection
    @CollectionTable(name = "tb_alergias", joinColumns = @JoinColumn(name = "idSaude"))
    private List<String> alergias;

    @ElementCollection
    @CollectionTable(name = "tb_doencas", joinColumns = @JoinColumn(name = "idSaude"))
    private List<String> doencas;

    @ElementCollection
    @CollectionTable(name = "tb_medicamentos", joinColumns = @JoinColumn(name = "idSaude"))
    private List<String> medicamentos;

    @ElementCollection
    @CollectionTable(name = "tb_ist", joinColumns = @JoinColumn(name = "idSaude"))
    private List<String> ist;

    private String tipoSanguineo;
    private String oxigenacao;
    private String batimento;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private UsuarioEntity usuarioEntity;

}
