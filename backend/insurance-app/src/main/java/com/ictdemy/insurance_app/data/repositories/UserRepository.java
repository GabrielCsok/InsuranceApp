package com.ictdemy.insurance_app.data.repositories;

import com.ictdemy.insurance_app.data.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * An interface that extends JpaRepository to retrieve user data from the database.
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
}
