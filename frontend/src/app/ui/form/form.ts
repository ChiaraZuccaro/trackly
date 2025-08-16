import { Component, inject, input } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Credentials, ErrsMessage, FormConfig, FormType, InputConfig } from '@interfaces/auth.interface';
import { AuthService } from '@services/auth';
import { ProviderData } from '@services/provider-data';

@Component({
  selector: 'local-form',
  imports: [ReactiveFormsModule],
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
      if(findedInput) { findedInput.errs.push(...errs) }
    }
  }

  private getControlErrors(controlName: string): (keyof ErrsMessage)[] {
    const control = this.logForm.controls[controlName];
    if (!control || !control.errors) return [];
    return Object.keys(control.errors) as (keyof ErrsMessage)[];
  }

  public logIn() {
    this.submitted = true;
    this.updateInvalidControls();

    if (this.logForm.invalid) { this.logForm.markAllAsTouched(); return; }
    
    const test: Credentials = { email: 'nonso@ok.com', pw: 'password' }

    this._auth[this.formConfig.method](test).subscribe({
      next: resp => console.log(resp),
      error: err => console.error(err)
    })
  }
}
