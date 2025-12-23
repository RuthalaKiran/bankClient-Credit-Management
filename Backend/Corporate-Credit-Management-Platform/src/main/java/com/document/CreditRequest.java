package com.document;

import com.enums.CreditStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "credit_requests")
public class CreditRequest {

    @Id
    private String id;

    /**
     * Relationship:
     * Client → Credit Requests
     */
    @Indexed
    private String clientId;

    /**
     * Relationship:
     * RM (User) → Credit Requests
     */
    @Indexed
    private String submittedBy;

    private Double requestAmount;

    private Integer tenureMonths;

    private String purpose;

    @Indexed
    private CreditStatus status;

    private String remarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
