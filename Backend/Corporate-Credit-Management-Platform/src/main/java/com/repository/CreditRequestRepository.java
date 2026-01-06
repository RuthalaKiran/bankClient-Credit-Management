package com.repository;

import com.document.CreditRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditRequestRepository extends MongoRepository<CreditRequest,String> {

    /**
     * find all credit requests based on rmId
     */
    List<CreditRequest> findBySubmittedBy(String rmId);

    /**
     * find the credit request based on the id
     */
    Optional<CreditRequest> findByIdAndSubmittedBy(String id, String rmId);

}
