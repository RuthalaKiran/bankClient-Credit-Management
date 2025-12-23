package com.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "clients")
public class Client {

    @Id
    private String id;

    @Indexed
    private String companyName;

    private String industry;

    private String address;

    private PrimaryContact primaryContact;

    private Double annualTurnover;

    private boolean documentsSubmitted;

    /**
     * Relationship:
     * RM (User) → Clients
     * Stored as userId reference
     */
    @Indexed
    private String rmId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
