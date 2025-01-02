import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import {catchError, Observable, tap, switchMap, BehaviorSubject, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

let isRefreshingToken = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const accessToken = auth.access_token();

  if (!accessToken) {
    return next(req);
  }

  return next(addToken(req, auth.access_token())).pipe(
    tap((event) => {
      console.log('Event:', event);
    }),
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next, auth);
      }
      console.error('Error:', error);
      throw new Error('Authentication failed');
    })
  );
}

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  if (token) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return req;
}

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn, auth: AuthService): Observable<HttpEvent<any>> {
  if (!isRefreshingToken) {
    isRefreshingToken = true;
    refreshTokenSubject.next(null);

    return auth.refreshToken().pipe(
      switchMap(({ access: token }) => {
        isRefreshingToken = false;
        refreshTokenSubject.next(token);
        return next(addToken(req, token));
      }),
      catchError((error) => {
        isRefreshingToken = false;
        auth.logout();
        return throwError(() => error);
      })
    )
  } else {
    return refreshTokenSubject.pipe(
      switchMap(token => {
        if (token) {
          return next(addToken(req, token));
        } else {
          return auth.refreshToken().pipe(
            switchMap(({access: newToken }) => {
              return next(addToken(req, newToken));
            }),
            catchError((error) => {
              return throwError(() => error);
            })
          );
        }
      })
    )
  }
}
