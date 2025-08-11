import { Component } from '@angular/core';
import { LocalForm } from '@ui/form/form';

@Component({
  selector: 'login',
  imports: [ LocalForm ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
}
