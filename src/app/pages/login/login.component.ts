import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  propUsername = new FormControl<string>('', [Validators.required, Validators.minLength(5)]);
  propPassword = new FormControl<string>('', [Validators.required, Validators.minLength(8)]);
  propRememberMe = new FormControl<boolean>(false);
  loginForm = new FormGroup({
    username: this.propUsername,
    password: this.propPassword,
    rememberMe: this.propRememberMe,
  });
  submitted = false;
  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }

  signing(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
