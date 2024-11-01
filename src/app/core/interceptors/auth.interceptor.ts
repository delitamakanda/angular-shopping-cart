import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);
  const accessToken = auth.access_token();

  if (!accessToken) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${accessToken}`
  })

  const newReq = req.clone({
    headers
  });

  return  next(newReq).pipe(
    tap((event) => {
      console.log('Event:', event);
    }),
    catchError(error => {
      console.error('Error:', error);
      throw  new Error('Authentication failed');
    })
  );
}
