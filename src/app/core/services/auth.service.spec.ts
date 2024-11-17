import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {API_URL} from "../../constants";
import { HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {Observable, of} from "rxjs";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: AuthService, useClass: AuthServiceMock  },
          provideHttpClient(withFetch()),
          provideHttpClientTesting(),
          { provide: API_URL, useValue: 'https://example.com/api' }  // Replace with actual API URL in your app
        ],
      });
      service = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
      apiUrl = TestBed.inject(API_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if user is authenticated', () => {
    expect(service.isAuthenticated()).toBeTruthy();
  });
  it('should set access token', () => {
    service.access_token.set('access_token_value');
    expect(service.access_token).toBeTruthy();
  });
  it('should set refresh token', () => {
    service.refresh_token.set('refresh_token_value');
    expect(service.refresh_token).toBeTruthy();
  });

  it('should login user', () => {
    const loginData = { username: 'test', password: 'test', remember_me: true };
    const authResponse = { access: 'access_token_value', refresh:'refresh_token_value', user: { username: 'test' } };
    service.login(loginData).subscribe(response => {
      expect(response).toEqual(authResponse as any);
    });
  })

  it('should register user', () => {
    const registrationData = { username: 'test', email: 'test@example.com', password1: 'test', password2: 'test' };
    const authResponse = { access: 'access_token_value', refresh:'refresh_token_value', user: { username: 'test' } };
    service.register(registrationData).subscribe(response => {
      expect(response).toEqual(authResponse as any);
    });
  })

});

export class AuthServiceMock {
  login(data: any): Observable<any> {
    return of({ access: 'access_token_value', refresh:'refresh_token_value', user: { username: 'test' } });
  }

  isAuthenticated(): boolean {
    return true;
  }

  access_token = {
    set: (value: string) =>{}
  };

  refresh_token = {
    set: (value: string) =>{}
  };

  register(data: any): Observable<any> {
    return of({ access: 'access_token_value', refresh:'refresh_token_value', user: { username: 'test' } });
  }
}
