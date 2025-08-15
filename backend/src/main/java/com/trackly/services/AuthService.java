package com.trackly.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.trackly.dtos.LoginUserDto;
import com.trackly.dtos.RegisterUserDto;
import com.trackly.models.User;
import com.trackly.enums.RespCode;
import com.trackly.repositories.UserRepository;
import com.trackly.security.JwtService;
import com.trackly.utils.CodeException;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtService jwtService;

  public void registerUser(RegisterUserDto req) {
    if (userRepository.existsByEmail(req.getEmail())) {
      throw new CodeException(RespCode.CONFLICT);
    }

    if(req.getUsername() == null) {
      throw new CodeException(RespCode.BAD_REQUEST);
    }

    User user = new User();
    user.setEmail(req.getEmail());
    user.setPassword(passwordEncoder.encode(req.getPassword()));
    user.setUsername(req.getUsername());

    userRepository.save(user);
  }

  public String loginUser(LoginUserDto req) {
    User user = userRepository.findByEmail(req.getEmail())
        .orElseThrow(() -> new CodeException(RespCode.NOT_FOUND));

    boolean passwordValid = passwordEncoder.matches(req.getPassword(), user.getPassword());
    if (!passwordValid) {
      throw new CodeException(RespCode.UNAUTHORIZED);
    }

    return jwtService.generateToken(user.getUsername());
  }

}
