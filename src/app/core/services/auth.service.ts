import {inject, Injectable, signal} from '@angular/core';
import {User} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../constants";
import {Observable, tap} from "rxjs";

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface LoginData {
  username: string;
  password: string;
  remember_me: boolean;
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
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/token/`, { username, password }).pipe(
      tap(authResponse => {
        if (remember_me) {
          localStorage.setItem('access_token', authResponse.access_token);
          localStorage.setItem('refresh_token', authResponse.refresh_token);
        }
        this.access_token.set(authResponse.access_token);
        this.refresh_token.set(authResponse.refresh_token);
      })
    );
  }
}
