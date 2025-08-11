import { Injectable } from "@angular/core";
import { FormType } from "@interfaces/auth.interface";
import { FORM_CONFIG } from "@utils/form.configs";

// EXAMPLE RESOURCE
// return resource({
//   params: () => this.keyFormConfig(),
//   loader: ({ params }) => {
//     const key = params;
//     if (!(key in FORM_CONFIG)) {
//       throw new Error(`Chiave form non valida: ${key}`);
//     }
//     return Promise.resolve(FORM_CONFIG[key]);
//   },
// });


@Injectable({ providedIn: 'root' })
export class ProviderData {
  public getFormConfig(key: FormType) {
    if (!(key in FORM_CONFIG)) {
      throw new Error(`Chiave form non valida: ${key}`);
    }
    return FORM_CONFIG[key];
  }
}
