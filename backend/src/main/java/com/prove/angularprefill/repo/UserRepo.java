package com.prove.angularprefill.repo;

import com.prove.angularprefill.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

  Optional<User> findUserById(Long id);
}
