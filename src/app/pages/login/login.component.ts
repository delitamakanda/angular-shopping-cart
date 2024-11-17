import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";

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
  authService = inject(AuthService);
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
    this.authService.login({
      username: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string,
      remember_me: this.loginForm.value?.rememberMe as boolean || false,
    }).subscribe();
    console.log(this.loginForm.value);
  }
}
