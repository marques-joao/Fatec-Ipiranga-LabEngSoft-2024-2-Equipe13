package com.joaomarques.teste_vitalcare.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joaomarques.teste_vitalcare.domain.model.Alergia;
import com.joaomarques.teste_vitalcare.domain.model.Doenca;
import com.joaomarques.teste_vitalcare.domain.model.Ist;
import com.joaomarques.teste_vitalcare.domain.model.Medicamento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Embedded
    private Alergia alergia;
    @Embedded
    private Doenca doenca;
    @Embedded
    private Medicamento medicamento;
    @Embedded
    private Ist ist;

    private String tipoSanguineo;
    private String oxigenacao;
    private String batimento;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idUsuario", nullable = false)
    private UsuarioEntity usuarioEntity;

}