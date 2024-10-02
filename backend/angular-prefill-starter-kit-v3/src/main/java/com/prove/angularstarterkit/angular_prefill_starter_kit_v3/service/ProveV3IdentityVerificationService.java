package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service;

import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ChallengeRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3CompleteRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3StartRequestDTO;
import com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto.v3ValidaRequestDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.h2.util.StringUtils;
import com.prove.proveapi.Proveapi;
import com.prove.proveapi.models.components.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.prove.proveapi.models.operations.V3ChallengeRequestResponse;
import com.prove.proveapi.models.operations.V3CompleteRequestResponse;
import com.prove.proveapi.models.operations.V3StartRequestResponse;
import com.prove.proveapi.models.operations.V3ValidateRequestResponse;

import java.util.List;
import java.util.ArrayList;

@Service
public class ProveV3IdentityVerificationService implements v3IdentityVerification {
  private final Logger logger = LoggerFactory.getLogger(ProveV3IdentityVerificationService.class);

  @Autowired
  private Proveapi sdk;

  @Override
  public V3StartResponse startRequest(v3StartRequestDTO start) {
    try {
      this.logger.info("Starting v3Start request with payload :{}", start);

      V3StartRequest request = V3StartRequest.builder()
        .phoneNumber(start.getPhoneNumber())
        .ssn(start.getLast4SSN())
        .ipAddress(start.getIpAddress())
        .flowType(start.getFlowType())
        .finalTargetUrl(start.getFinalTargetUrl())
        .build();

      V3StartRequestResponse response = this.sdk.v3().v3StartRequest()
        .request(request)
        .call();

      V3StartResponse v3StartResponse = response.v3StartResponse().orElseThrow();

      this.logger.info("v3Start response :{}", v3StartResponse);

      return v3StartResponse;
    } catch (Exception e) {
      this.logger.error("v3Start response error :{}", e.getMessage());
      throw new RuntimeException(e);
    }
  }

  @Override
  public V3ValidateResponse validateRequest(v3ValidaRequestDTO validation) {
    try {
      this.logger.info("Starting v3Validate request with payload :{}", validation);

      V3ValidateRequest request = V3ValidateRequest.builder()
        .correlationId(validation.correlationId)
        .build();

      V3ValidateRequestResponse response = this.sdk.v3().v3ValidateRequest()
        .request(request)
        .call();

      V3ValidateResponse v3ValidateResponse = response.v3ValidateResponse().orElseThrow();

      this.logger.info("v3Validate response :{}", v3ValidateResponse);

      return v3ValidateResponse;
    } catch (Exception e) {
      this.logger.error("v3Validate response error :{}", e.getMessage());
      throw new RuntimeException(e);
    }
  }

  @Override
  public V3ChallengeResponse challengeRequest(v3ChallengeRequestDTO challengeRequest) {
    try {
      this.logger.info("Starting v3Challenge request with payload :{}", challengeRequest);

      String dayOfBirth = challengeRequest.getDob();

      V3ChallengeRequest.Builder builder = V3ChallengeRequest.builder()
        .ssn(challengeRequest.getLast4SSN())
        .correlationId(challengeRequest.getCorrelationId());

      // Check if individual has a day of birth
      if (!StringUtils.isNullOrEmpty(dayOfBirth)) {
        builder.dob(dayOfBirth);
      }

      V3ChallengeRequest request = builder.build();

      V3ChallengeRequestResponse response = this.sdk.v3().v3ChallengeRequest()
        .request(request)
        .call();

      V3ChallengeResponse v3ChallengeResponse = response.v3ChallengeResponse().orElseThrow();

      this.logger.info("v3Challenge response :{}", v3ChallengeResponse);

      return v3ChallengeResponse;
    } catch (Exception e) {
      this.logger.error("v3Challenge response error :{}", e.getMessage());
      throw new RuntimeException(e);
    }
  }

  @Override
  public V3CompleteResponse completeRequest(v3CompleteRequestDTO completeRequest) {
    try {
      this.logger.info("Starting v3Complete request with payload :{}", completeRequest);

      String ssn = completeRequest.getIndividual().getSsn();
      String firstName = completeRequest.getIndividual().getFirstName();
      String lastName = completeRequest.getIndividual().getLastName();
      String dayOfBirth = completeRequest.getIndividual().getDob();
      List<String> emailAddresses = completeRequest.getIndividual().getEmailAddresses();

      List<V3CompleteAddressEntryRequest> addresses = new ArrayList<>();
      List<v3CompleteRequestDTO.v3AddressDTO> individualAddresses = completeRequest.getIndividual().getAddresses();

      for (v3CompleteRequestDTO.v3AddressDTO add : individualAddresses) {
        V3CompleteAddressEntryRequest addressEntryRequest = V3CompleteAddressEntryRequest.builder()
          .address(add.getAddress())
          .city(add.getCity())
          .extendedAddress(add.getExtendedAddress())
          .postalCode(add.getPostalCode())
          .region(add.getRegion())
          .build();
        addresses.add(addressEntryRequest);
      }

      // Building complete request
      V3CompleteRequest.Builder builder = V3CompleteRequest.builder()
        .correlationId(completeRequest.getCorrelationId());
      V3CompleteIndividualRequest.Builder individualBuilder = V3CompleteIndividualRequest.builder()
        .emailAddresses(emailAddresses)
        .addresses(addresses)
        .firstName(firstName)
        .lastName(lastName)
        .ssn(ssn);

      // Check if individual has a day of birth
      if (!StringUtils.isNullOrEmpty(dayOfBirth)) {
        individualBuilder.dob(dayOfBirth);
      }

      V3CompleteRequest request = builder.individual(individualBuilder.build()).build();

      V3CompleteRequestResponse response = this.sdk.v3().v3CompleteRequest()
        .request(request)
        .call();

      V3CompleteResponse v3CompleteResponse = response.v3CompleteResponse().orElseThrow();

      this.logger.info("v3Complete response :{}", v3CompleteResponse);

      return v3CompleteResponse;
    } catch (Exception e) {
      this.logger.error("v3Complete response error :{}", e.getMessage());
      throw new RuntimeException(e);
    }
  }
}
