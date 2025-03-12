package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.dto.mappers.InsuranceMapper;
import com.ictdemy.insurance_app.models.exceptions.InsuranceNotFoundException;
import com.ictdemy.insurance_app.models.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the service interface for managing insurance data.
 * Provides methods to create, retrieve, update, and delete insurance records.
 */
@Service
public class InsuranceServiceImpl implements InsuranceService{

    private final InsuranceRepository insuranceRepository;
    private final InsuranceMapper insuranceMapper;
    private final UserRepository userRepository;

    /**
     * Constructs an InsuranceServiceImpl with the given repository and mapper dependencies.
     *
     * @param insuranceRepository the repository for InsuranceEntity objects.
     * @param insuranceMapper     the mapper for converting between InsuranceDTO and InsuranceEntity.
     * @param userRepository      the repository for UserEntity objects.
     */
    public InsuranceServiceImpl(InsuranceRepository insuranceRepository, InsuranceMapper insuranceMapper, UserRepository userRepository) {
        this.insuranceRepository = insuranceRepository;
        this.insuranceMapper = insuranceMapper;
        this.userRepository = userRepository;
    }

    /**
     * Creates a new insurance record from the provided InsuranceDTO.
     * Converts the DTO to an entity, sets the insurer (and insured if applicable),
     * saves it in the database, and returns the saved record as a DTO.
     *
     * @param insuranceDTO the InsuranceDTO containing the data for the new insurance.
     * @return the created InsuranceDTO representing the saved insurance record.
     * @throws UserNotFoundException if the insurer with insurerId or the insured with the insured id
     * record does not exist.
     */
    @Override
    public InsuranceDTO createInsurance(InsuranceDTO insuranceDTO) {

        InsuranceEntity insuranceEntity= insuranceMapper.toEntity(insuranceDTO);

        Long insurerId = insuranceDTO.getInsurer().getId();
        UserEntity insurer = userRepository.findById(insurerId)
                .orElseThrow(() -> new UserNotFoundException(insurerId));
        insuranceEntity.setInsurer(insurer);

        if ("PERSONAL".equals(insuranceDTO.getInsuranceType()) && insuranceDTO.getInsured() != null) {
            Long insuredId = insuranceDTO.getInsured().getId();
            UserEntity insured = userRepository.findById(insuredId)
                    .orElseThrow(() -> new UserNotFoundException(insuredId));
            insuranceEntity.setInsured(insured);
        } else {
            insuranceEntity.setInsured(null);
        }

        InsuranceEntity savedEntity = insuranceRepository.save(insuranceEntity);
        return insuranceMapper.toDTO(savedEntity);

    }

    /**
     * Retrieves an insurance record by its ID.
     *
     * @param id the ID of the insurance to retrieve.
     * @return the InsuranceDTO representing the insurance record.
     * @throws InsuranceNotFoundException if the insurance record does not exist.
     */
    @Override
    public InsuranceDTO getInsuranceById(Long id) {

        InsuranceEntity entity = insuranceRepository.findById(id)
                .orElseThrow(() -> new InsuranceNotFoundException (id));
        return insuranceMapper.toDTO(entity);
    }

    /**
     * Retrieves all insurance records from the database.
     *
     * @return a List of InsuranceDTO objects representing all insurance records.
     */
    @Override
    public List<InsuranceDTO> getAllInsurances() {
        List<InsuranceEntity> entities = insuranceRepository.findAll();
        return entities.stream()
                .map(insuranceMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing insurance record identified by its ID with new data from an InsuranceDTO.
     *
     * @param id            the ID of the insurance to update.
     * @param insuranceDTO  the InsuranceDTO containing the updated data.
     * @return the updated InsuranceDTO.
     * @throws InsuranceNotFoundException if the insurance record does not exist.
     */
    @Override
    public InsuranceDTO updateInsurance(Long id, InsuranceDTO insuranceDTO) {

        InsuranceEntity existingEntity = insuranceRepository.findById(id)
                .orElseThrow(() -> new InsuranceNotFoundException(id));

        insuranceMapper.updateEntityFromDTO(insuranceDTO, existingEntity);

        InsuranceEntity updatedEntity = insuranceRepository.save(existingEntity);

        return insuranceMapper.toDTO(updatedEntity);
    }

    /**
     * Deletes an insurance record from the database based on its ID.
     *
     * @param id the ID of the insurance record to delete.
     * @throws InsuranceNotFoundException if the insurance record does not exist.
     */
    @Override
    public void deleteInsurance(Long id) {

        if(!insuranceRepository.existsById(id)) {
            throw new InsuranceNotFoundException(id);
        }
        insuranceRepository.deleteById(id);
    }
}
