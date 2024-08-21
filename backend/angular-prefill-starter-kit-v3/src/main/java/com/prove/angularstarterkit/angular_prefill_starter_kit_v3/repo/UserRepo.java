package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.repo;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
}
