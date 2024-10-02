package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.controllers;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3StartRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ValidaRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3CompleteRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ChallengeRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service.v3IdentityVerification;

import com.prove.proveapi.models.components.V3StartResponse;
import com.prove.proveapi.models.components.V3ValidateResponse;
import com.prove.proveapi.models.components.V3CompleteResponse;
import com.prove.proveapi.models.components.V3ChallengeResponse;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

@RestController
public class IdentityVerifyController {
  @Autowired
  private v3IdentityVerification verificationService;

  @PostMapping("/v3/start")
  @ExceptionHandler
  public ResponseEntity<V3StartResponse> v3StartRequest(@Valid @RequestBody v3StartRequestDTO request,
                                                        BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return handleValidationErrors(bindingResult);
    }
    V3StartResponse v3StartResponse = this.verificationService.startRequest(request);
    return new ResponseEntity<>(v3StartResponse, HttpStatus.OK);
  }

  @PostMapping("/v3/validate")
  @ExceptionHandler
  public ResponseEntity<V3ValidateResponse> v3ValidateRequest(@Valid @RequestBody v3ValidaRequestDTO request,
                                                              BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return handleValidationErrors(bindingResult);
    }
    V3ValidateResponse v3ValidateResponse = this.verificationService.validateRequest(request);
    return new ResponseEntity<>(v3ValidateResponse, HttpStatus.OK);
  }

  @PostMapping("/v3/challenge")
  @ExceptionHandler
  public ResponseEntity<V3ChallengeResponse> v3ChallengeRequest(@Valid @RequestBody v3ChallengeRequestDTO request,
                                              BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return handleValidationErrors(bindingResult);
    }
    V3ChallengeResponse v3ChallengeResponse = this.verificationService.challengeRequest(request);
    return new ResponseEntity<>(v3ChallengeResponse, HttpStatus.OK);
  }

  @PostMapping("/v3/complete")
  @ExceptionHandler
  public ResponseEntity<V3CompleteResponse> v3CompleteRequest(@Valid @RequestBody v3CompleteRequestDTO request,
                                                              BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return handleValidationErrors(bindingResult);
    }
    V3CompleteResponse v3CompleteResponse = this.verificationService.completeRequest(request);
    return new ResponseEntity<>(v3CompleteResponse, HttpStatus.OK);
  }

  @SuppressWarnings("unchecked")
  private <T extends ResponseEntity<?>> T handleValidationErrors(BindingResult bindingResult) {
    Map<String, String> errors = new HashMap<>();
    // Collect validation errors
    bindingResult.getFieldErrors().forEach(fieldError -> {
      errors.put(fieldError.getField(), fieldError.getDefaultMessage());
    });
    ResponseEntity<Map<String, String>> tResponseEntity = new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    return (T) tResponseEntity;
  }
}
