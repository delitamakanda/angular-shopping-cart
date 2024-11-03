import { Component } from '@angular/core';
import { FormsModule, NgForm} from "@angular/forms";
import {KeyValuePipe, NgFor, NgStyle} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
