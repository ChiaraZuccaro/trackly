import { Validators } from "@angular/forms";
import { FormConfig, FormType } from "@interfaces/auth.interface";

export const FORM_CONFIG: Record<FormType, FormConfig> = {
  login: {
    inputs: [
      {
        label: 'Email',
        id: 'email',
        controlName: 'email',
        type: 'email',
        errs: [],
        validators: [ Validators.required, Validators.email ],
        isRequired: true,
        errsMessage: {
          idName: 'emailError',
          required: 'Email obbligatoria',
          email: 'Inserisci un formato email valido'
        }
      },
      {
        label: 'Password',
        id: 'password',
        controlName: 'password',
        type: 'password',
        errs: [],
        validators: [ Validators.required ],
        isRequired: true,
        errsMessage: {
          idName: 'passwordError',
          required: 'Password obbligatoria'
        }
      }
    ],
    method: 'login'
  },
  register: {
    inputs: [
      {
        label: 'Email',
        id: 'email',
        controlName: 'email',
        type: 'email',
        errs: [],
        validators: [ Validators.required, Validators.email ],
        isRequired: true,
        errsMessage: {
          idName: 'emailError',
          required: 'Devi inserire una mail',
          email: 'Il formato della mail sembra non essere valida'
        }
      },
      {
        label: 'Password (almeno 6 caratteri)',
        id: 'password',
        controlName: 'password',
        type: 'password',
        errs: [],
        validators: [ Validators.required, Validators.minLength(6) ],
        isRequired: true,
        errsMessage: {
          idName: 'passwordError',
          required: 'Inserisci una password',
          minlength: 'Deve essere lunga almeno 6 caratteri'
        }
      },
      {
        label: 'Nome',
        id: 'name',
        controlName: 'name',
        type: 'text',
        errs: [],
        validators: [ Validators.required ],
        isRequired: true,
        errsMessage: {
          idName: 'nameError',
          required: 'Inserisci un nome, sapremo come vorrai essere chiamato'
        }
      }
    ],
    method: 'register'
  }
}