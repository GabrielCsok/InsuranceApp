package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.models.dto.UserDTO;
import java.util.List;

/**
 * Service interface for managing user data.
 * Provides methods to create, retrieve, update, and delete user records.
 */
public interface UserService {

    void create(UserDTO user);

    UserDTO getUserById(Long id);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);
}
