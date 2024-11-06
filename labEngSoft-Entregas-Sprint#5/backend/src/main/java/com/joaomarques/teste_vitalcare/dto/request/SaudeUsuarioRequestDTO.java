package com.joaomarques.teste_vitalcare.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaudeUsuarioRequestDTO {

    private String tipoSanguineo;
    private String oxigenacao;
    private String batimento;
    private List<String> ist;
    private List<String> alergias;
    private List<String> doencas;
    private List<String> medicamentos;

}