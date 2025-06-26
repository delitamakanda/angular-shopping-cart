import { TestBed } from '@angular/core/testing';
import {CanActivateFn, Router} from '@angular/router';

import { authGuard } from './auth.guard';
import {AuthService} from "../services/auth.service";

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when authenticated', () => {
  const mockAuthService = { isAuthenticated: jasmine.createSpy().and.returnValue(true) };
  const mockRouter = { navigate: jasmine.createSpy() };

  TestBed.configureTestingModule({
    providers: [
      { provide: AuthService, useValue: mockAuthService },
      { provide: Router, useValue: mockRouter }
    ]
  });

  const guard = executeGuard({} as any, {} as any);

  expect(guard).toBe(true);
  expect(mockRouter.navigate).not.toHaveBeenCalled();
});

});
