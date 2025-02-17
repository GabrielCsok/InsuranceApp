package com.ictdemy.insurance_app.models.services;

import com.ictdemy.insurance_app.models.dto.UserDTO;
import java.util.List;


public interface UserService {

    void create(UserDTO user);

    UserDTO getUserById(Long id);

    List<UserDTO> getAllUsers();

    UserDTO updateUser(Long id, UserDTO userDTO);

    void deleteUser(Long id);

}
