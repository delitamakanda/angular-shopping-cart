import {inject, Injectable, signal} from '@angular/core';
import {StaticPagesService} from "../services/static-pages.service";
import {catchError, delay, EMPTY, finalize, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StaticPagesStoreService {
  private readonly api = inject(StaticPagesService);
  private readonly _loading = signal<boolean>(false);
  private readonly _selectedPage = signal<string>('');
  private readonly _error = signal<string>('');

  readonly loading = this._loading.asReadonly();
  readonly selectedPage = this._selectedPage.asReadonly();
  readonly error = this._error.asReadonly();

  fetchPage(page: string): Observable<string> {
    this._loading.set(true);
    this._error.set('');
    return this.api.getStaticPage(page).pipe(
      delay(200),
      tap(response => {
        this._selectedPage.set(response)
      }),
      catchError(error => {
        this._error.set(error.message);
        this._selectedPage.set('');
        return of('');
      }),
      finalize(() => this._loading.set(false))
    );
  }



}
