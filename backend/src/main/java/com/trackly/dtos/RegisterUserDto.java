package com.trackly.dtos;

public class RegisterUserDto extends LoginUserDto {
  private String name;

  public RegisterUserDto() { super(); }

  // Getter e Setter
  public String getUsername() { return name; }
  public void setUsername(String name) { this.name = name; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
}
