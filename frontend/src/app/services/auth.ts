import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credentials } from '@interfaces/auth.interface';
import { env } from 'src/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = env.api + '/auth';
  private _http = inject(HttpClient);

  public register(params: Credentials) {
    const url = this.baseUrl + '/register';

    return this._http.post(url, params)
  }

  public login(params: Credentials) {
    const url = this.baseUrl + '/login';

    return this._http.post(url, params)
  }

  public resetPassword(email: string) {
    const url = this.baseUrl + '/recover_pw';

    return this._http.post(url, email)
  }
}
