package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  @Value("${prove.allowed-origins}")
  private String allowedOrigins;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      // Configure HTTP headers for security
      .headers(headers -> {
        headers
          // Content Security Policy
          .contentSecurityPolicy(csp -> csp
            .policyDirectives("default-src 'self'"))
          // Cross-Origin Embedder Policy
          .crossOriginEmbedderPolicy(Customizer.withDefaults())
          // Cross-Origin Opener Policy
          .crossOriginOpenerPolicy(Customizer.withDefaults())
          // Cross-Origin Resource Policy
          .crossOriginResourcePolicy(Customizer.withDefaults())
          // FrameGuard (X-Frame-Options)
          .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
          // Hide Powered-By (remove X-Powered-By header)
          .addHeaderWriter(new StaticHeadersWriter("X-Powered-By", ""))
          // DNS Prefetch Control
          .addHeaderWriter(new StaticHeadersWriter("X-DNS-Prefetch-Control", "off"))
          // IE No Open (X-Download-Options)
          .addHeaderWriter(new StaticHeadersWriter("X-Download-Options", "noopen"))
          .addHeaderWriter(new StaticHeadersWriter("X-Permitted-Cross-Domain-Policies", "none"))
          // Origin-Agent-Cluster
          .addHeaderWriter(new StaticHeadersWriter("Origin-Agent-Cluster", "?1"))
          // HTTP Strict Transport Security
          .httpStrictTransportSecurity(Customizer.withDefaults())
          // No Sniff (X-Content-Type-Options)
          .contentTypeOptions(Customizer.withDefaults())
          // Referrer Policy
          .referrerPolicy(Customizer.withDefaults())
          .addHeaderWriter(new StaticHeadersWriter("X-XSS-Protection", "0"));
      })
      .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
        .anyRequest()
        .permitAll());
    return http.build();
  }

  // Configure CORS settings
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    // Specify your CORS configurations
    configuration.setAllowedOrigins(Arrays.asList(this.allowedOrigins.split(",")));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
