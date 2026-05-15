import {inject, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StaticPagesService {
  private readonly http = inject(HttpClient);

  getStaticPage(page: string): Observable<string> {
    return this.http.get(`assets/legal/fr/${page}.html`, {responseType: 'text'}).pipe(
      catchError(() => EMPTY)
    )
  }

}
