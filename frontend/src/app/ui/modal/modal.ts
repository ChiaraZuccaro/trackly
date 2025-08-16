import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralResp } from '@interfaces/api-resp.interface';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal implements OnInit {
  private _router = inject(Router);

  public apiResp = input.required<GeneralResp>();

  ngOnInit() { this.launchModal() }

  private navigateTo(key: 'register' | 'dashboard') {
    this._router.navigate([key]);
  }

  private getMethod() {
    let key: 'register' | 'dashboard';

    switch (this.apiResp().type) {
      case 'login':
        key = this.apiResp().error ? 'register' : 'dashboard';
      break;
      case 'register':
        key = this.apiResp().error ? 'register' : 'dashboard';
      break;
    }

    this.navigateTo(key);
  }

  private createSwaloptions(): SweetAlertOptions {
    return {
      icon: this.apiResp().error ? 'error' : 'success',
      title: this.apiResp().code,
      text: this.apiResp().message,
      showCancelButton: !!this.apiResp().btnMsg,
      confirmButtonText: this.apiResp().btnMsg ?? 'Vai',
      cancelButtonText: 'Ok',
      preConfirm: () => this.getMethod()
    }
  }

  private launchModal() {
    const swalOptions = this.createSwaloptions();

    Swal.fire(swalOptions);
  }
}
