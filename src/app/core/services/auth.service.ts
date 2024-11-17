import {inject, Injectable, signal} from '@angular/core';
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../constants";
import {Observable, tap} from "rxjs";

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
  user = signal(null);

  isAuthenticated(): boolean {
   return !!this.access_token;
}

  constructor() {
    this.access_token.set(localStorage.getItem('access_token') ?? '');
  }

  login({ username, password, remember_me }: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login/`, { username, password }).pipe(
      tap(authResponse => {
        console.log(authResponse)
        if (remember_me) {
          localStorage.setItem('remember_me', 'true');
        }
          localStorage.setItem('access_token', authResponse.access);
          localStorage.setItem('refresh_token', authResponse.refresh);

        this.access_token.set(authResponse.access);
        this.refresh_token.set(authResponse.refresh);
      })
    );
  }

  register(body: RegistrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration/`, body);

  }
}
