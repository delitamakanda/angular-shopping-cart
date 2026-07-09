import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { extractLocale } from '../services/locale.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    router.navigate(['/', extractLocale(state.url), 'login']);
    return false;
  }
  return true;
};
