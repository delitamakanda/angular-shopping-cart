import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {emailValidator, passwordValidator, mismatchPasswordValidator} from "../../core/validators/domain-validator";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-signup',
    imports: [
        FormsModule,
        ReactiveFormsModule,
      RouterLink,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl<string>('', [Validators.required, Validators.email, emailValidator]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8), passwordValidator]),
    confirmPassword: new FormControl<string>('', [Validators.required, mismatchPasswordValidator]),
  })
  submitted = false;
  authService = inject(AuthService);
  router = inject(Router);

  register(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.register({
      username: this.signupForm.value.username as string,
      email: this.signupForm.value.email as string,
      password1: this.signupForm.value.password as string,
      password2: this.signupForm.value.confirmPassword as string
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => console.error(error),
      complete: () => this.submitted = false,
    });
    console.log(this.signupForm.value);
  }
}
