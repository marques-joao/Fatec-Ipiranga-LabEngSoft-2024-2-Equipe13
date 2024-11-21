package com.joaomarques.vitalcare.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_evento")
public class EventoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idEvento;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime horario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String lembrete;

    @Column(nullable = false)
    private String tipoEvento;

    private String endereco;
    private String descricao;
    private String recorrencia;
    private LocalTime horarioLembrete;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "idUsuario", nullable = false)
    private UsuarioEntity usuarioEntity;

    public void setHorarioLembrete(String momentoLembrete) {
        try {
            if (horario == null) {
                throw new IllegalStateException("O horário do evento não foi definido.");
            }

            LocalDateTime eventoDateTime = LocalDateTime.of(data, horario);

            switch(momentoLembrete) {
                case "No horário do evento":
                    this.horarioLembrete = horario;
                    break;
                case "5 minutos antes":
                    this.horarioLembrete = horario.minusMinutes(5);
                    break;
                case "10 minutos antes":
                    this.horarioLembrete = horario.minusMinutes(10);
                    break;
                case "15 minutos antes":
                    this.horarioLembrete = horario.minusMinutes(15);
                    break;
                case "1 hora antes":
                    this.horarioLembrete = horario.minusHours(1);
                    break;
                case "1 dia antes":
                    LocalDateTime lembrete1DiaAntes = eventoDateTime.minusDays(1);
                    this.horarioLembrete = lembrete1DiaAntes.toLocalTime();
                    break;
                default:
                    throw new IllegalArgumentException("Opção de lembrete inválida: " + momentoLembrete);
            }

        } catch(Exception e) {
            System.err.println(">>>>>>>>>>> Deu ruim: " + e.getMessage());
        }
    }

}
