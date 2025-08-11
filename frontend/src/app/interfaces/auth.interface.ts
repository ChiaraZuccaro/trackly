import { FormControl, ValidatorFn } from "@angular/forms";

export type FormType = 'login' | 'register';
export type ControlName = 'email' | 'password' | 'name';
export type InputType = 'email' | 'password' | 'text';

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
}

export interface Credentials {
  email: string,
  password: string,
  name?: string
}