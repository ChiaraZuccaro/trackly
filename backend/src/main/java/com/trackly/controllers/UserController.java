package com.trackly.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trackly/user")
public class UserController {
  @GetMapping("/profile")
  public String getUserProfile() {
    return "Ciao dal profile!";
  }
}
