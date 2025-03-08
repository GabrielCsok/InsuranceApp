package com.ictdemy.insurance_app.models.dto.mappers;

import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.models.dto.UserDTO;
import org.mapstruct.*;


@Mapper(componentModel= "spring")
public interface UserMapper {

    /**
     * Converts a UserDTO into a UserEntity
     * @param source - UserDTO
     * @return - UserEntity
     */
    UserEntity toEntity(UserDTO source);

    /**
     * Converts a UserEntity into a UserDTO
     * @param source - UserEntity
     * @return - UserDTO
     */
    UserDTO toDTO(UserEntity source);

    /**
     * Updates an existing UserDTO with a new UserDTO
     * @param source - UserDTO
     * @param target - UserDTO
     */
    void updateUserDTO(UserDTO source, @MappingTarget UserDTO target);

    /**
     * Updates a UserEntity with a new UserEntity
     * @param source - UserEntity
     * @param target - UserEntity
     */
    void updateUserEntity(UserEntity source, @MappingTarget UserEntity target);

    /**
     * Updates a UserEntity from a UserDTO
     * @param source - UserDTO
     * @param target - UserEntity
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateEntityFromDTO(UserDTO source, @MappingTarget UserEntity target);

}
