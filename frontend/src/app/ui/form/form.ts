import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GeneralResp } from '@interfaces/api-resp.interface';
import { Credentials, ErrsMessage, FormConfig, FormType, InputConfig } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth';
import { ProviderData } from '@services/provider-data';
import { Modal } from '@ui/modal/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'local-form',
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class LocalForm {
  private _auth = inject(AuthService);
  private _provider = inject(ProviderData);
  private _formBuilder = inject(NonNullableFormBuilder);

  public formKey = input.required<FormType>();

  public logForm: FormGroup;
  public submitted: boolean;

  public formConfig: FormConfig;

  public invalidControls: Record<string, boolean> = {};
  public errors: ErrsMessage[];

  public hasResp = signal(false);
  public modalJson = signal<GeneralResp>({} as GeneralResp);

  ngOnInit() {
    this.formConfig = this._provider.getFormConfig(this.formKey());
    this.initForm();

    this.logForm.statusChanges.subscribe(
      () => this.updateInvalidControls()
    );
  }

  private initForm() {
    const controlsConfig = this.formConfig.inputs.reduce((acc: any, input: InputConfig) => {
      acc[input.controlName] = this._formBuilder.control('', input.validators || []);
      return acc;
    }, {});

    this.logForm = this._formBuilder.group(controlsConfig);
  }

  private resetErrs() {
    this.formConfig.inputs.forEach(inp => inp.errs = []);
  }

  private updateInvalidControls() {
    this.resetErrs();
    this.invalidControls = {};
    const allControls = this.logForm.controls;

    for (const controlName in allControls) {
      const control = allControls[controlName];
      this.invalidControls[controlName] = (control.touched || this.submitted) && control.invalid;

      const findedInput = this.formConfig.inputs.find(inp => inp.controlName === controlName);
      const errs = this.getControlErrors(controlName);
      if (findedInput) { findedInput.errs.push(...errs) }
    }
  }

  private getControlErrors(controlName: string): (keyof ErrsMessage)[] {
    const control = this.logForm.controls[controlName];
    if (!control || !control.errors) return [];
    return Object.keys(control.errors) as (keyof ErrsMessage)[];
  }

  private createCredentialsFromForm(): Credentials {
    return Object.entries(this.logForm.controls).reduce(
      (acc: any, [key, formControl]) => {
        acc[key] = formControl.value;
        return acc;
      }, {}
    );
  }

  public logIn() {
    this.submitted = true;
    this.updateInvalidControls();

    if (this.logForm.invalid) { this.logForm.markAllAsTouched(); return; }
    
    const data = this.createCredentialsFromForm();
    this._auth[this.formConfig.method](data).pipe(
      finalize(() => this.hasResp.set(true))
    ).subscribe({
      next: resp => this.modalJson.set({
        ...resp,
        type: this.formKey(),
        btnMsg: 'Vai alla dashboard!'
      }),
      error: err => this.modalJson.set({
        ...err.error,
        type: this.formKey(),
        btnMsg: 'Vai alla registrazione!'
      })
    });
  }
}