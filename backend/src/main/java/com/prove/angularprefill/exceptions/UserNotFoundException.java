package com.prove.angularprefill.exceptions;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String  message) {
    super(message);
  }
}
