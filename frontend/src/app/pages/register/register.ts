import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormType } from '@interfaces/auth.interface';
import { LocalForm } from '@ui/form/form';
import { map } from 'rxjs';

@Component({
  selector: 'register',
  imports: [LocalForm],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private _route = inject(ActivatedRoute);

  public formType: FormType;

  ngOnInit(): void {
    this._route.url.pipe(
      map(urlFrags => urlFrags[0].path)
    ).subscribe(path => this.formType = path as FormType);
  }
}
