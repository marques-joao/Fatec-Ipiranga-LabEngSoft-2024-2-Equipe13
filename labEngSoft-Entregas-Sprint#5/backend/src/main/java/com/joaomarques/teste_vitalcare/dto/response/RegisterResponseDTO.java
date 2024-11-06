package com.joaomarques.teste_vitalcare.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponseDTO {

    private String status;
    private String message;
    private Object data;

}