package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto;

import java.util.List;

import lombok.Getter;
import lombok.ToString;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class v3CompleteRequestDTO {
  @NotNull(message = "Correlation ID must not be null")
  @NotEmpty(message = "Correlation ID must not be empty")
  private String correlationId;
  @Valid
  @NotNull(message = "Individual must be provided")
  private v3CompleteRequestDTO.v3IndividualDTO individual;

  // Inner class for Individual details
  @Getter
  @ToString
  @AllArgsConstructor
  public static class v3IndividualDTO {
    // Getters and Setters for IndividualDTO
    @Size(max = 100, message = "First name must be a string of at most 100 characters")
    private String firstName;
    @Size(max = 100, message = "Last name must be a string of at most 100 characters")
    private String lastName;
    @Pattern(regexp = "^$|^\\d{4}-\\d{2}-\\d{2}$", message = "Date of birth must be in YYYY-MM-DD format")
    private String dob;
    @Length(min = 4, max = 4, message = "Last 4 SSN must be exactly 4 digits")
    private String last4SSN;
    @Size(max = 11, message = "SSN must be a valid string")
    private String ssn;
    private List<@Email(message = "Each email address must be valid") String> emailAddresses;
    @Valid
    private List<@Valid v3AddressDTO> addresses;
  }

  // Inner class for Address details
  @Getter
  @ToString
  @AllArgsConstructor
  public static class v3AddressDTO {
    // Getters and Setters for AddressDTO
    @Size(max = 255, message = "Address must be a string of at most 255 characters")
    private String address;
    @Size(max = 100, message = "City must be a string of at most 100 characters")
    private String city;
    @Size(max = 100, message = "Extended address must be a string of at most 100 characters")
    private String extendedAddress;
    @Size(max = 20, message = "Postal code must be a string of at most 20 characters")
    private String postalCode;
    @Size(max = 100, message = "Region must be a string of at most 100 characters")
    private String region;
  }
}
