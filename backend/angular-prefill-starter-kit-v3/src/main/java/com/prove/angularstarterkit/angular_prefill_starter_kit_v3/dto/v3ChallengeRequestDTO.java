package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto;

import lombok.Getter;
import lombok.ToString;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Getter
@ToString
public class v3ChallengeRequestDTO {
  @NotNull(message = "Correlation ID must be a string")
  @NotEmpty(message = "Correlation ID must be a string")
  public String correlationId;
  @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Date of birth must be in YYYY-MM-DD format")
  public String dob;
  @NotNull(message = "Last 4 SSN must be exactly 4 digits")
  @NotEmpty(message = "Last 4 SSN must be exactly 4 digits")
  public String last4SSN;
}
