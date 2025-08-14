package com.trackly.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trackly.dtos.LoginUserDto;
import com.trackly.dtos.RegisterUserDto;
import com.trackly.enums.RespCode;
import com.trackly.services.AuthService;
import com.trackly.utils.CodeException;
import com.trackly.utils.ApiResp;
import com.trackly.utils.Messages;

@RestController
@RequestMapping("/trackly/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  private String getMessage(RespCode code, String type) {
    String fallbackMsg = "Errore di fallback";
    switch (type) {
      case "register":
        return Messages.RegisterMessages.getOrDefault(code, fallbackMsg);
      case "login":
        return Messages.LoginMessages.getOrDefault(code, fallbackMsg);
      default:
        return fallbackMsg;
    }
  }

  @PostMapping("/register")
  public ResponseEntity<ApiResp> register(@RequestBody RegisterUserDto request) {
    String typeMsgs = "register";
    try {
      authService.registerUser(request);

      String msg = getMessage(RespCode.OK, typeMsgs);
      return new ApiResp(RespCode.OK, msg).send();

    } catch (CodeException e) {
      
      String msg = getMessage(e.getCode(), typeMsgs);
      return new ApiResp(e.getCode(), msg, true).send();
    } catch (Exception e) {

      String msg = getMessage(RespCode.INTERNAL_SERVER_ERROR, typeMsgs);
      return new ApiResp(RespCode.INTERNAL_SERVER_ERROR, msg, true).send();
    }
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResp> login (@RequestBody LoginUserDto request) {
    String typeMsgs = "login";
    try {
      authService.loginUser(request);

      String msg = getMessage(RespCode.OK, typeMsgs);
      return new ApiResp(RespCode.OK, msg).send();

    } catch (CodeException e) {
      
      String msg = getMessage(e.getCode(), typeMsgs);
      return new ApiResp(e.getCode(), msg, true).send();
    } catch (Exception e) {

      String msg = getMessage(RespCode.INTERNAL_SERVER_ERROR, typeMsgs);
      return new ApiResp(RespCode.INTERNAL_SERVER_ERROR, msg, true).send();
    }
  }

  // @PostMapping("/recover-password")
  // public ResponseEntity<ApiResp> recoverPassword (@RequestBody LoginUserDto request) {
  //   String typeMsgs = "login";
  //   try {
  //     authService.loginUser(request);

  //     String msg = getMessage(RespCode.OK, typeMsgs);
  //     return new ApiResp(RespCode.OK, msg).send();

  //   } catch (CodeException e) {
      
  //     String msg = getMessage(e.getCode(), typeMsgs);
  //     return new ApiResp(e.getCode(), msg, true).send();
  //   } catch (Exception e) {

  //     String msg = getMessage(RespCode.INTERNAL_SERVER_ERROR, typeMsgs);
  //     return new ApiResp(RespCode.INTERNAL_SERVER_ERROR, msg, true).send();
  //   }
  // }
}