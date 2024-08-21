package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.controllers;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @GetMapping("/data")
  public ResponseEntity<User> Test() {
    User newUser = new User();
    newUser.setId(1L);
    newUser.setLastFour(1234);
    newUser.setPhoneNumber("1234567890");
    newUser.setFirstName("John");
    newUser.setLastName("Johnson");
    newUser.setAddress("123 Main St");
    newUser.setCity("Los Angeles");
    newUser.setState("California");
    newUser.setZip("12345");
    newUser.setDob("12/20/2004");
    return new ResponseEntity<>(newUser, HttpStatus.OK);
  }
}
