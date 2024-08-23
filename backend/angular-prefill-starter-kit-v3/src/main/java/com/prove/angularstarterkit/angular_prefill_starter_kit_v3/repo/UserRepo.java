package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.repo;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
  Optional<User> findUserById(Long id);
  Optional<User> findUserByLastFour(Integer lastFour);
  Optional<User> findUserByPhoneNumber(String phoneNumber);
}
