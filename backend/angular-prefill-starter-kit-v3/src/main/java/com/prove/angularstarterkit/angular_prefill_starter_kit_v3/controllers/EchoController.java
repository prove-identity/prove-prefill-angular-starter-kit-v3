package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EchoController {

  @GetMapping("/echo")
  public ResponseEntity<String> echo() {
    return new ResponseEntity<>("ok", HttpStatus.OK);
  }
}
