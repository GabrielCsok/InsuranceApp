package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.repositories.InsuranceRepository;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import com.ictdemy.insurance_app.models.dto.mappers.InsuranceMapper;
import com.ictdemy.insurance_app.models.exceptions.InsuranceNotFoundException;
import com.ictdemy.insurance_app.models.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InsuranceServiceImpl implements InsuranceService{

    private final InsuranceRepository insuranceRepository;
    private final InsuranceMapper insuranceMapper;
    private final UserRepository userRepository;


    public InsuranceServiceImpl(InsuranceRepository insuranceRepository, InsuranceMapper insuranceMapper, UserRepository userRepository) {
        this.insuranceRepository = insuranceRepository;
        this.insuranceMapper = insuranceMapper;
        this.userRepository = userRepository;
    }

    /**
     * Takes in an InsuranceDTO, converts it into an Entity to save it in the database,
     * and then converts the saved entity back into a DTO to return it
     * @param insuranceDTO
     * @return - InsuranceDTO of the saved InsuranceEntity
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
     * Takes in the id of an insurance, finds the entity with the id in the database,
     * and then returns it as an InsuranceDTO object
     * @param id
     * @return - InsuranceDTO
     */
    @Override
    public InsuranceDTO getInsuranceById(Long id) {

        InsuranceEntity entity = insuranceRepository.findById(id)
                .orElseThrow(() -> new InsuranceNotFoundException (id));
        return insuranceMapper.toDTO(entity);
    }

    /**
     * Gets all insurances in the database and returns them in a List, that is made up of InsuranceDTOs
     * @return - A list of InsuranceDTO objects
     */
    @Override
    public List<InsuranceDTO> getAllInsurances() {
        List<InsuranceEntity> entities = insuranceRepository.findAll();
        return entities.stream()
                .map(insuranceMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Takes in the id of an existing InsuranceDTO and a new InuranceDTO object to update the existing one
     * with the id provided
     * @param id - InsuranceEntity id
     * @param insuranceDTO - New InsuranceDTO
     * @return - updated InsuranceDTO
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
     * Deletes an insurance from the database that has the same id as the param
     * @param id
     */
    @Override
    public void deleteInsurance(Long id) {

        if(!insuranceRepository.existsById(id)) {
            throw new InsuranceNotFoundException(id);
        }
        insuranceRepository.deleteById(id);
    }
}
