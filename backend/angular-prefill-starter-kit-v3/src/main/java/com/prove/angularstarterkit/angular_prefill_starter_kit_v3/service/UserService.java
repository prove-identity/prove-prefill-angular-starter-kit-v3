package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.exceptions.UserNotFoundException;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.models.User;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
  private final UserRepo userRepo;

  @Autowired
  public UserService(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  public User addUser(User user) {
    return userRepo.save(user);
  }

  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  public User updateUser(User user) {
    return userRepo.save(user);
  }

  public void deleteUser(User user) {
    userRepo.delete(user);
  }

  public User findUserById(Long id) {
    return userRepo.findUserById(id).orElseThrow(()
      -> new UserNotFoundException("User with id " + id + " not found"));
  }
}
