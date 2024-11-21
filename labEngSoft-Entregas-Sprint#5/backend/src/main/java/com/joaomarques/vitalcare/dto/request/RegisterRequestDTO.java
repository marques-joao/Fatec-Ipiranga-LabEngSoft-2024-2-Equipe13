package com.joaomarques.vitalcare.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private String nomeCompleto;
    private String email;
    private String senha;
    private String contatoEmergencia;
    private String nomeContatoEmergencia;

}