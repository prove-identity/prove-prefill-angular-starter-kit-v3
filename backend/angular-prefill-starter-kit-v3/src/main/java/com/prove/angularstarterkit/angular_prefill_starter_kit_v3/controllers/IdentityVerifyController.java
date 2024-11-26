package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.controllers;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3StartRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ValidaRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3CompleteRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ChallengeRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service.IdentityV3Response;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service.v3IdentityVerification;

import com.prove.proveapi.models.components.V3StartResponse;
import com.prove.proveapi.models.components.V3ValidateResponse;
import com.prove.proveapi.models.components.V3CompleteResponse;
import com.prove.proveapi.models.components.V3ChallengeResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.validation.Valid;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
public class IdentityVerifyController {
  private final Logger logger = LoggerFactory.getLogger(IdentityVerifyController.class);

  @Autowired
  private v3IdentityVerification verificationService;

  @PostMapping("/v3/start")
  @ExceptionHandler
  public ResponseEntity<IdentityV3Response<V3StartResponse>> v3StartRequest(@Valid @RequestBody v3StartRequestDTO request,
                                                                            BindingResult bindingResult) {
    try {
      if (bindingResult.hasErrors()) {
        return handleValidationErrors(bindingResult);
      }
      IdentityV3Response<V3StartResponse> v3StartResponseIdentityV3Response =
        this.verificationService.startRequest(request);
      return new ResponseEntity<>(v3StartResponseIdentityV3Response, HttpStatus.OK);
    } catch (Exception e) {
      String exceptionMessage = e.getMessage();
      if (exceptionMessage == null) {
        exceptionMessage = Arrays.toString(e.getStackTrace());
      }
      this.logger.error("v3Start response error :{}", exceptionMessage);
      return new ResponseEntity<>(new IdentityV3Response<>(exceptionMessage), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/v3/validate")
  @ExceptionHandler
  public ResponseEntity<IdentityV3Response<V3ValidateResponse>> v3ValidateRequest(@Valid @RequestBody v3ValidaRequestDTO request,
                                                                                  BindingResult bindingResult) {
    try {
      if (bindingResult.hasErrors()) {
        return handleValidationErrors(bindingResult);
      }
      IdentityV3Response<V3ValidateResponse> v3ValidateResponseIdentityV3Response =
        this.verificationService.validateRequest(request);
      return new ResponseEntity<>(v3ValidateResponseIdentityV3Response, HttpStatus.OK);
    } catch (Exception e) {
      String exceptionMessage = e.getMessage();
      if (exceptionMessage == null) {
        exceptionMessage = Arrays.toString(e.getStackTrace());
      }
      this.logger.error("v3Validate response error :{}", exceptionMessage);
      return new ResponseEntity<>(new IdentityV3Response<>(exceptionMessage), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/v3/challenge")
  @ExceptionHandler
  public ResponseEntity<IdentityV3Response<V3ChallengeResponse>> v3ChallengeRequest(@Valid @RequestBody v3ChallengeRequestDTO request,
                                                                                    BindingResult bindingResult) {
    try {
      if (bindingResult.hasErrors()) {
        return handleValidationErrors(bindingResult);
      }
      IdentityV3Response<V3ChallengeResponse> v3ChallengeResponseIdentityV3Response =
        this.verificationService.challengeRequest(request);
      return new ResponseEntity<>(v3ChallengeResponseIdentityV3Response, HttpStatus.OK);
    } catch (Exception e) {
      String exceptionMessage = e.getMessage();
      if (exceptionMessage == null) {
        exceptionMessage = Arrays.toString(e.getStackTrace());
      }
      this.logger.error("v3Challenge response error :{}", exceptionMessage);
      return new ResponseEntity<>(new IdentityV3Response<>(exceptionMessage), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/v3/complete")
  @ExceptionHandler
  public ResponseEntity<IdentityV3Response<V3CompleteResponse>> v3CompleteRequest(@Valid @RequestBody v3CompleteRequestDTO request,
                                                                                  BindingResult bindingResult) {
    try {
      if (bindingResult.hasErrors()) {
        return handleValidationErrors(bindingResult);
      }
      IdentityV3Response<V3CompleteResponse> v3CompleteResponseIdentityV3Response =
        this.verificationService.completeRequest(request);
      return new ResponseEntity<>(v3CompleteResponseIdentityV3Response, HttpStatus.OK);
    } catch (Exception e) {
      String exceptionMessage = e.getMessage();
      if (exceptionMessage == null) {
        exceptionMessage = Arrays.toString(e.getStackTrace());
      }
      this.logger.error("v3Complete response error :{}", exceptionMessage);
      return new ResponseEntity<>(new IdentityV3Response<>(exceptionMessage), HttpStatus.BAD_REQUEST);
    }
  }

  @SuppressWarnings("unchecked")
  @ExceptionHandler(MethodArgumentNotValidException.class)
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
