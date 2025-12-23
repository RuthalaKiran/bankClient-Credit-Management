package com.repository;

import com.document.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client,String> {
    List<Client> findByRmId(String rmId);

    Optional<Client> findByIdAndRmId(String id, String rmId);

    List<Client> findByRmIdAndCompanyNameContainingIgnoreCase(String rmId, String companyName);

    List<Client> findByRmIdAndIndustryContainingIgnoreCase(String rmId, String industry);
}
