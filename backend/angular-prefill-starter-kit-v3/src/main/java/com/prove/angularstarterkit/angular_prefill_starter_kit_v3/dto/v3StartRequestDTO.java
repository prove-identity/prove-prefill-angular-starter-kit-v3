package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto;

import lombok.Getter;
import lombok.ToString;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;
import org.hibernate.validator.constraints.Length;

@Getter
@ToString
public class v3StartRequestDTO {
  @NotBlank(message = "Phone number must not be empty")
  private String phoneNumber;
  @NotBlank(message = "Last 4 SSN must not be null")
  @Length(min = 4, max = 4, message = "Last 4 SSN must be exactly 4 digits")
  private String last4SSN;
  @Pattern(regexp = "^([0-9]{1,3}\\.){3}[0-9]{1,3}$", message = "IP address must be valid")
  private String ipAddress;
  @NotBlank(message = "Flow type must not be null")
  @Pattern(regexp = "desktop|mobile", message = "Flow type must be either 'desktop' or 'mobile'")
  private String flowType;
  @URL(message = "Final target URL must be valid")
  private String finalTargetUrl;

}

