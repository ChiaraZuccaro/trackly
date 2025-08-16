import { ValidatorFn } from "@angular/forms";
import { AuthService } from "@services/auth";

export type FormType = 'login' | 'register';
export type ControlName = 'email' | 'password' | 'username';
export type InputType = 'email' | 'password' | 'text';
export type AuthServiceMethods = {
  login: (params: Credentials) => ReturnType<AuthService['login']>;
  register: (params: Credentials) => ReturnType<AuthService['register']>;
  recoverPassword: (params: Credentials) => ReturnType<AuthService['recoverPassword']>;
  resetPassword: (params: Credentials) => ReturnType<AuthService['resetPassword']>;
};


export interface ErrsMessage {
  idName: string,
  required: string,
  email?: string,
  minlength?: string
}

export interface InputConfig {
  label: string,
  id: string,
  controlName: ControlName,
  type: InputType,
  validators: ValidatorFn[],
  isRequired: boolean,
  errs: (keyof ErrsMessage)[],
  errsMessage: ErrsMessage
}

export interface FormConfig {
  inputs: InputConfig[],
  method: keyof AuthServiceMethods
}

export interface Credentials {
  email: string,
  password: string,
  username?: string
}