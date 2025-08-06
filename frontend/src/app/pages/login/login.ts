import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@services/auth';

@Component({
  selector: 'login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  private _auth = inject(Auth);

  ngOnInit() {
    this._auth.login({ email: 'nonso@ok.com', password: 'password' }).subscribe(resp => {
      console.log(resp);
      
    })
  }
}
