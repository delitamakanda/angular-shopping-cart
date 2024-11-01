import { Injectable } from '@angular/core';
import {Notyf} from "notyf";

@Injectable({
  providedIn: 'root'
})
export class ToastService extends Notyf {

  constructor() {
    super({
      duration: 3000,
      position: {
        x: 'center',
        y: 'top'
      }
    });
  }
}
