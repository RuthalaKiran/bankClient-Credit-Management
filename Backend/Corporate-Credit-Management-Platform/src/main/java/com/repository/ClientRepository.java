package com.repository;

import com.document.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client,String> {

    /**
     * find clients by rmId
     */
    List<Client> findByRmId(String rmId);

    /**
     * find client by id and rmId
     */
    Optional<Client> findByIdAndRmId(String id, String rmId);

    /**
     * filter clients based on company name
     */
    List<Client> findByRmIdAndCompanyNameContainingIgnoreCase(String rmId, String companyName);

    /**
     * filter clients based on industry name
     */
    List<Client> findByRmIdAndIndustryContainingIgnoreCase(String rmId, String industry);
}
