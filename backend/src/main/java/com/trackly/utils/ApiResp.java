package com.trackly.utils;

import org.springframework.http.ResponseEntity;

import com.trackly.enums.RespCode;

public class ApiResp<T> {

  private final RespCode code;
  private final String message;
  private final boolean error;
  private final T data;

  // Costruttore principale
  public ApiResp(RespCode code, String message, boolean error, T data) {
    this.code = code;
    this.message = message;
    this.error = error;
    this.data = data;
  }

  // Costruttore secondario, senza dati
  public ApiResp(RespCode code, String message) {
    this(code, message, false, null);
  }

  // Costruttore secondario, con flag errore ma senza dati
  public ApiResp(RespCode code, String message, boolean error) {
    this(code, message, error, null);
  }

  // Metodo send tipizzato e senza warning
  public ResponseEntity<ApiResp<T>> send() {
    return ResponseEntity.status(this.code.getCode()).body(this);
  }

  // Getter
  public RespCode getCode() { return code; }
  public String getMessage() { return message; }
  public boolean isError() { return error; }
  public T getData() { return data; }
}
