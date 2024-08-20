package com.prove.angularstarterkit.angular_prefill_starter_kit_v3.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class User implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, updatable = false)
  private Long id;
  private Integer lastFour;
  private String phoneNumber;
  private String firstName;
  private String lastName;
  private String address;
  private String city;
  private String state;
  private String zip;
  private String dob;

  public User() {}

  public User(Integer lastFour, String phoneNumber, String firstName, String lastName, String address, String city, String state, String zip, String dob) {
    this.lastFour = lastFour;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.dob = dob;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getLastFour() {
    return lastFour;
  }

  public void setLastFour(Integer lastFour) {
    this.lastFour = lastFour;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getDob() {
    return dob;
  }

  public void setDob(String dob) {
    this.dob = dob;
  }

  @Override
  public String toString() {
    return "User id:" + id + ", name" + firstName + " " + lastName +
      " Address" + address + " City" + city + " State" + state +
      " Zipcode" + zip + " DOB" + dob;
  }

}
