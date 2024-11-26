package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.config;

import com.prove.proveapi.Proveapi;
import com.prove.proveapi.models.components.Security;
import org.h2.util.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.naming.ConfigurationException;

@Configuration
public class ProveConfiguration {
  @Bean
  public Proveapi initializeProveSDKBean(@Value("${prove.client-id}") String clientId, @Value("${prove.client-secret}") String clientSecret) throws ConfigurationException {
    if (StringUtils.isNullOrEmpty(clientId) || StringUtils.isNullOrEmpty(clientSecret)) {
      throw new ConfigurationException("ClientId or ClientSecret wasn't provided");
    }

    return Proveapi.builder()
      .security(Security.builder()
        .clientID(clientId)
        .clientSecret(clientSecret)
        .build())
      .build();
  }
}
