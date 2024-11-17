import { AbstractControl} from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailPattern.test(control.value) ? null : { emailInvalid: true };
}

export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(control.value) ? null : { passwordInvalid: true };
}

export function mismatchPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value!== confirmPassword.value? { passwordMismatch: true } : null;
}
