import {inject, Injectable, signal} from '@angular/core';
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../constants";
import {catchError, Observable, tap, throwError} from "rxjs";

type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
}

interface LoginData {
  username: string;
  password: string;
  remember_me: boolean;
}

interface RegistrationData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  access_token = signal('');
  refresh_token = signal('');
  user = signal({} as User);

  get isAuthenticated(): boolean {
   return !!this.access_token();
}

  constructor() {
    this.access_token.set(localStorage.getItem('access_token') ?? '');
  }

  login({ username, password, remember_me }: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, { username, password }).pipe(
      tap(authResponse => {
        if (remember_me) {
          localStorage.setItem('remember_me', 'true');
        }
          localStorage.setItem('access_token', authResponse.access);
          localStorage.setItem('refresh_token', authResponse.refresh);

        this.access_token.set(authResponse.access);
        this.refresh_token.set(authResponse.refresh);
        this.user.set(authResponse.user);
      }),
      catchError(err => {
        console.error('Error logging in:', err);
        return throwError(err);
      })
    );
  }

  register(body: RegistrationData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/registration/`, body).pipe(
      tap((authResponse: AuthResponse) => {
        localStorage.setItem('access_token', authResponse.access);
        localStorage.setItem('refresh_token', authResponse.refresh);
        this.access_token.set(authResponse.access);
        this.refresh_token.set(authResponse.refresh);
        this.user.set(authResponse.user);
      }),
      catchError(err => {
        console.error('Error registering:', err);
        return throwError(err);
      })
    );

  }

  refreshToken(): Observable<{ access: string }> {
    return this.http.post<{ access: string }>(`${this.apiUrl}/auth/token/refresh/`, { refresh: window.localStorage.getItem('refresh_token') }).pipe(
      tap(authResponse => {
        localStorage.setItem('access_token', authResponse.access);
        this.access_token.set(authResponse.access);
      })
    )
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout/`, {}).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.access_token.set('');
        this.refresh_token.set('');
        this.user.set({} as User);
      }),
      catchError(err => {
        console.error('Error logging out:', err);
        return throwError(err);
      })
    )
  }
}
