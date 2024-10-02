package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.service;

import lombok.*;

@Getter
@ToString
public class IdentityV3Response<T> {
  private T responseData;
  private String exception;

  public IdentityV3Response(T responseData) {
    this.responseData = responseData;
  }

  public IdentityV3Response(String exception) {
    this.exception = exception;
  }
}


