import { Component, input, OnInit } from '@angular/core';
import { GeneralResp } from '@interfaces/api-resp.interface';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal implements OnInit { 
  public apiResp = input.required<GeneralResp>();

  ngOnInit() { this.launchModal() }

  private createSwaloptions(): SweetAlertOptions {
    return {
      icon: this.apiResp().error ? 'error' : 'success',
      title: this.apiResp().code,
      text: this.apiResp().message
    }
  }

  private launchModal() {
    const swalOptions = this.createSwaloptions();

    Swal.fire(swalOptions);
  }
}
