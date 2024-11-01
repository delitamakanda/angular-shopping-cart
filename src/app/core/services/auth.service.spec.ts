import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {API_URL} from "../../constants";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: API_URL, useValue: 'https://example.com' },
        provideHttpClientTesting(),
        provideHttpClient()// Include HttpClientTestingModule for mocking HTTP requests in tests
      ]
    });
    service = TestBed.inject(AuthService);
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

});
