package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.data.enums.Role;
import com.ictdemy.insurance_app.data.entities.UserEntity;
import com.ictdemy.insurance_app.data.repositories.UserRepository;
import com.ictdemy.insurance_app.models.dto.UserDTO;
import com.ictdemy.insurance_app.models.exceptions.DuplicateEmailException;
import com.ictdemy.insurance_app.models.exceptions.PasswordDoNotEqualException;
import com.ictdemy.insurance_app.models.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.ictdemy.insurance_app.models.dto.mappers.UserMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Creates a UserEntity in the database based on a UserDTO object,
     * encodes the password and also assigns the USER role by default
     * @param user - A UserDTO object
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
     * Takes in an id, finds the Entity in the database with the id,
     * converts it into a UserDTO and returns it
     * @param - id
     * @return - UserDTO object
     */
    @Override
    public UserDTO getUserById(Long id){
        UserEntity entity = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
        return userMapper.toDTO(entity);
    }

    /**
     * Gets all users from the database, converts them into DTOs
     * then returns them in a List
     * @return - A List of UserDTOs
     */
    public List<UserDTO> getAllUsers(){
        List<UserEntity> entities = userRepository.findAll();

        return entities.stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Takes in the id of an existing UserEntity, updates the UserEntity with a UserDTO,
     * converts the updated UserEntity into a UserDTO and returns it
     * @param id - id of the existing UserEntity
     * @param userDTO - UserDTO object with new data
     * @return - UserDTO
     */
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEntity existingEntity = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userMapper.updateEntityFromDTO(userDTO, existingEntity);

        UserEntity updatedEntity = userRepository.save(existingEntity);

        return userMapper.toDTO(updatedEntity);
    }

    /**
     * Deletes a UserEntity from the database that matches the id
     * @param id
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }
}
