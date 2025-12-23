package com.service;

import com.document.Client;
import com.document.PrimaryContact;
import com.dto.ClientRequestDTO;
import com.dto.ClientResponseDTO;
import com.dto.PrimaryContactDTO;
import com.exception.ClientNotFoundException;
import com.repository.ClientRepository;
import com.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    private final JwtService jwtService;

    private final HttpServletRequest request;

    // to fetch rmId from the jwt token
    private String getCurrentUserId() {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7); // Bearer <token>
        return jwtService.extractUserId(token);
    }

    // CREATE CLIENT (RM ONLY)
    public ClientResponseDTO createClient(ClientRequestDTO dto) {

        // getting rmId from the token
        String rmId = getCurrentUserId();

        Client client = Client.builder()
                .companyName(dto.getCompanyName())
                .industry(dto.getIndustry())
                .address(dto.getAddress())
                .annualTurnover(dto.getAnnualTurnover())
                .documentsSubmitted(dto.isDocumentsSubmitted())
                .rmId(rmId)
                .primaryContact(
                        PrimaryContact.builder()
                                .name(dto.getPrimaryContact().getName())
                                .email(dto.getPrimaryContact().getEmail())
                                .phone(dto.getPrimaryContact().getPhone())
                                .build()
                )
                .build();

        return mapToResponse(clientRepository.save(client));
    }

    // GET OWN CLIENTS
    public List<ClientResponseDTO> getMyClients(String name, String industry) {

        String rmId = getCurrentUserId();
        List<Client> clients;

        if (name != null) {
            clients = clientRepository
                    .findByRmIdAndCompanyNameContainingIgnoreCase(rmId, name);
        } else if (industry != null) {
            clients = clientRepository
                    .findByRmIdAndIndustryContainingIgnoreCase(rmId, industry);
        } else {
            clients = clientRepository.findByRmId(rmId);
        }

        return clients.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET CLIENT BY ID (OWNERSHIP CHECK)
    public ClientResponseDTO getClientById(String id) {

        String rmId = getCurrentUserId();

        Client client = clientRepository
                .findByIdAndRmId(id, rmId)
                .orElseThrow(() ->
                        new ClientNotFoundException("Client not found"));

        return mapToResponse(client);
    }

    // UPDATE CLIENT
    public ClientResponseDTO updateClient(String id, ClientRequestDTO dto) {

        String rmId = getCurrentUserId();

        Client client = clientRepository
                .findByIdAndRmId(id, rmId)
                .orElseThrow(() ->
                        new ClientNotFoundException("Client not found"));

        client.setCompanyName(dto.getCompanyName());
        client.setIndustry(dto.getIndustry());
        client.setAddress(dto.getAddress());
        client.setAnnualTurnover(dto.getAnnualTurnover());
        client.setDocumentsSubmitted(dto.isDocumentsSubmitted());

        client.setPrimaryContact(
                PrimaryContact.builder()
                        .name(dto.getPrimaryContact().getName())
                        .email(dto.getPrimaryContact().getEmail())
                        .phone(dto.getPrimaryContact().getPhone())
                        .build()
        );

        return mapToResponse(clientRepository.save(client));
    }

    // GET ALL CLIENTS FOR ADMIN
    public List<ClientResponseDTO> getAllClientsForAdmin(){
        List<Client> clients = clientRepository.findAll();

        return clients.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // MAPPER
    private ClientResponseDTO mapToResponse(Client client) {
        return ClientResponseDTO.builder()
                .id(client.getId())
                .companyName(client.getCompanyName())
                .industry(client.getIndustry())
                .address(client.getAddress())
                .annualTurnover(client.getAnnualTurnover())
                .documentsSubmitted(client.isDocumentsSubmitted())
                .primaryContact(
                        PrimaryContactDTO.builder()
                                .name(client.getPrimaryContact().getName())
                                .email(client.getPrimaryContact().getEmail())
                                .phone(client.getPrimaryContact().getPhone())
                                .build()
                )
                .build();
    }
}
