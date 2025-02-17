package com.ictdemy.insurance_app.models.dto.mappers;

import com.ictdemy.insurance_app.data.entities.InsuranceEntity;
import com.ictdemy.insurance_app.models.dto.InsuranceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel= "spring")
public interface InsuranceMapper {

    /**
     * Converts an InsuranceDTO into and InsuranceEntity
     * @param source, an InsuranceDTO
     * @return - InsuranceEntity
     */
    InsuranceEntity toEntity(InsuranceDTO source);

    /**
     * Converts and InsuranceEntity into and InsuranceDTO
     * @param source, an InsuranceDTO
     * @return - InsuranceDTO
     */
    InsuranceDTO toDTO(InsuranceEntity source);

    /**
     * Updates an existing InsuranceDTO with a new one
     * @param source - new InsuranceDTO
     * @param target - old InsuranceDTO
     */
    void updateInsuranceDTO(InsuranceDTO source, @MappingTarget InsuranceDTO target);

    /**
     * Updates an existing InsuranceEntity with a new one
     * @param source - new InsuranceEntity
     * @param target - old InsuranceDTO
     */
    void updateInsuranceEntity(InsuranceEntity source, @MappingTarget InsuranceEntity target);

    /**
     * Updates and InsuranceEntity from and InsuranceDTO
     * @param source - InsuranceDTO
     * @param target - InsuranceEntity
     */
    void updateEntityFromDTO(InsuranceDTO source, @MappingTarget InsuranceEntity target);

}
