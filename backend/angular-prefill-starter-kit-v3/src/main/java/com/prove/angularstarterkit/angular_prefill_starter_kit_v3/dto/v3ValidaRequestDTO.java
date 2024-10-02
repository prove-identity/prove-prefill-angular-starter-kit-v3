package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.dto;

import lombok.Getter;
import lombok.ToString;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class v3ValidaRequestDTO {
  @NotNull(message = "Correlation ID must be a string")
  @NotEmpty(message = "Correlation ID must be a string")
  public String correlationId;
}
