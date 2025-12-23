package com.document;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PrimaryContact {

    private String name;
    private String email;
    private String phone;
}
