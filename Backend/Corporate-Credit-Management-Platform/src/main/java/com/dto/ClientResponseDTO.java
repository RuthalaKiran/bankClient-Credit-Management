package com.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientResponseDTO {

    private String id;
    private String companyName;
    private String industry;
    private String address;
    private PrimaryContactDTO primaryContact;
    private Double annualTurnover;
    private boolean documentsSubmitted;
}
