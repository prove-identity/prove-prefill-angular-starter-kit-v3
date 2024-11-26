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
  public IdentityV3Response<V3StartResponse> startRequest(v3StartRequestDTO start) throws Exception {
    this.logger.info("Starting v3Start request with payload :{}", start);

    V3StartRequest.Builder builder = V3StartRequest.builder();

    if (!StringUtils.isNullOrEmpty(start.getIpAddress())) {
      builder.ipAddress(start.getIpAddress());
    }
    if (!StringUtils.isNullOrEmpty(start.getFinalTargetUrl())) {
      builder.finalTargetUrl(start.getFinalTargetUrl());
    }

    V3StartRequest request = builder.phoneNumber(start.getPhoneNumber())
      .ssn(start.getLast4SSN())
      .flowType(start.getFlowType()).build();

    V3StartRequestResponse response = this.sdk.v3().v3StartRequest()
      .request(request)
      .call();

    V3StartResponse v3StartResponse = response.v3StartResponse().orElseThrow();

    this.logger.info("v3Start response :{}", v3StartResponse);

    return new IdentityV3Response<>(v3StartResponse);
  }

  @Override
  public IdentityV3Response<V3ValidateResponse> validateRequest(v3ValidaRequestDTO validation) throws Exception {
    this.logger.info("Starting v3Validate request with payload :{}", validation);

    V3ValidateRequest request = V3ValidateRequest.builder()
      .correlationId(validation.correlationId)
      .build();

    V3ValidateRequestResponse response = this.sdk.v3().v3ValidateRequest()
      .request(request)
      .call();

    V3ValidateResponse v3ValidateResponse = response.v3ValidateResponse().orElseThrow();

    this.logger.info("v3Validate response :{}", v3ValidateResponse);

    return new IdentityV3Response<>(v3ValidateResponse);
  }

  @Override
  public IdentityV3Response<V3ChallengeResponse> challengeRequest(v3ChallengeRequestDTO challengeRequest) throws Exception {
    this.logger.info("Starting v3Challenge request with payload :{}", challengeRequest);


    V3ChallengeRequest.Builder builder = V3ChallengeRequest.builder()
      .correlationId(challengeRequest.getCorrelationId());


    V3ChallengeRequest request = builder.build();

    V3ChallengeRequestResponse response = this.sdk.v3().v3ChallengeRequest()
      .request(request)
      .call();

    V3ChallengeResponse v3ChallengeResponse = response.v3ChallengeResponse().orElseThrow();

    this.logger.info("v3Challenge response :{}", v3ChallengeResponse);

    return new IdentityV3Response<>(v3ChallengeResponse);
  }

  @Override
  public IdentityV3Response<V3CompleteResponse> completeRequest(v3CompleteRequestDTO completeRequest) throws Exception {
    this.logger.info("Starting v3Complete request with payload :{}", completeRequest);

    String ssn = completeRequest.getIndividual().getSsn();
    String firstName = completeRequest.getIndividual().getFirstName();
    String lastName = completeRequest.getIndividual().getLastName();
    String dayOfBirth = completeRequest.getIndividual().getDob();
    List<String> emailAddresses = completeRequest.getIndividual().getEmailAddresses();

    List<V3CompleteAddressEntryRequest> addresses = new ArrayList<>();
    List<v3CompleteRequestDTO.v3AddressDTO> individualAddresses = completeRequest.getIndividual().getAddresses();

    for (v3CompleteRequestDTO.v3AddressDTO add : individualAddresses) {
      V3CompleteAddressEntryRequest.Builder addressEntryRequestBuilder = V3CompleteAddressEntryRequest.builder();
      if (StringUtils.isNullOrEmpty(add.getExtendedAddress())) {
        addressEntryRequestBuilder.extendedAddress(add.getExtendedAddress());
      }
      V3CompleteAddressEntryRequest addressEntryRequest = addressEntryRequestBuilder.address(add.getAddress())
        .city(add.getCity())
        .postalCode(add.getPostalCode())
        .region(add.getRegion())
        .build();

      addresses.add(addressEntryRequest);
    }

    // Building complete request
    V3CompleteRequest.Builder builder = V3CompleteRequest.builder()
      .correlationId(completeRequest.getCorrelationId());
    V3CompleteIndividualRequest.Builder individualBuilder = V3CompleteIndividualRequest.builder()
      .addresses(addresses)
      .firstName(firstName)
      .lastName(lastName);

    if (emailAddresses != null && !emailAddresses.isEmpty()) {
      individualBuilder.emailAddresses(emailAddresses);
    }

    if (!StringUtils.isNullOrEmpty(ssn)) {
      individualBuilder.ssn(ssn);
    }

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

    return new IdentityV3Response<>(v3CompleteResponse);
  }
}
