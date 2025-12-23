package com.repository;

import com.document.CreditRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditRequestRepository extends MongoRepository<CreditRequest,String> {

    List<CreditRequest> findBySubmittedBy(String rmId);

    Optional<CreditRequest> findByIdAndSubmittedBy(String id, String rmId);


}
