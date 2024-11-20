package com.joaomarques.vitalcare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChamadaSOSResponseDTO {

    private Long idChamadaSOS;
    private String dataHora;
    private Long idUsuario;

    public ChamadaSOSResponseDTO (Long idChamadaSOS, LocalDateTime dataHora, Long idUsuario) {
        this.idChamadaSOS = idChamadaSOS;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        this.dataHora = dataHora.format(formatter);
        this.idUsuario = idUsuario;
    }

}