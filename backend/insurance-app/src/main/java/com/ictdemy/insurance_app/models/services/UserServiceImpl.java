package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.data.enums.Role;
import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
import com.ictdemy.insurance_app.models.dto.UserDTO;
import com.ictdemy.insurance_app.models.exceptions.DuplicateEmailException;
import com.ictdemy.insurance_app.models.exceptions.InsuranceNotFoundException;
import com.ictdemy.insurance_app.models.exceptions.PasswordDoNotEqualException;
import com.ictdemy.insurance_app.models.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.ictdemy.insurance_app.models.dto.mappers.UserMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the service interface for managing user data.
 * Provides methods to create, retrieve, update, and delete user records.
 */
@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructs a UserServiceImpl with the given repository and mapper dependencies.
     *
     * @param userRepository the repository for UserEntity objects.
     * @param userMapper     the mapper for converting between UserDTO and UserEntity.
     * @param passwordEncoder the password encoder used to encode the user's password.
     */
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Creates a new user record from the provided UserDTO.
     * Converts the DTO to an entity,
     * saves it in the database, throws an exception if the email is already taken.
     *
     * @param user the UserDTO containing the data for the new user.
     * @throws PasswordDoNotEqualException if the two passwords do not match.
     */
    @Override
    public void create(UserDTO user) {
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            throw new PasswordDoNotEqualException();
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setAddress(user.getAddress());
        userEntity.setPhoneNumber(user.getPhoneNumber());
        userEntity.setBirthDate(user.getBirthDate());
        userEntity.setRole(Role.USER);

        try {
            userRepository.save(userEntity);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEmailException();
        }
    }

    /**
     * Retrieves a user record by its ID.
     *
     * @param id the ID of the user to retrieve.
     * @return the UserDTO representing the user record.
     * @throws UserNotFoundException if the user record does not exist.
     */
    @Override
    public UserDTO getUserById(Long id){
        UserEntity entity = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
        return userMapper.toDTO(entity);
    }

    /**
     * Retrieves all user records from the database.
     *
     * @return a List of UserDTO objects representing all user records.
     */
    public List<UserDTO> getAllUsers(){
        List<UserEntity> entities = userRepository.findAll();

        return entities.stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Updates an existing user record identified by its ID with new data from an UserDTO.
     *
     * @param id            the ID of the user to update.
     * @param userDTO  the userDTO containing the updated data.
     * @return the updated userDTO.
     * @throws UserNotFoundException if the user record does not exist.
     */
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity existingEntity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userMapper.updateEntityFromDTO(userDTO, existingEntity);

        UserEntity updatedEntity = userRepository.save(existingEntity);

        return userMapper.toDTO(updatedEntity);
    }

    /**
     * Deletes a user record from the database based on its ID.
     *
     * @param id the ID of the user record to delete.
     * @throws UserNotFoundException if the user record does not exist.
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }
}
