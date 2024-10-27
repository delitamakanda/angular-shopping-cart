import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, map, Observable, of, tap} from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  private products$ = new BehaviorSubject<Product[]>([]);
  private searchTerm$ = new BehaviorSubject<string>('');
  public productsSearched$ = combineLatest([this.products$, this.searchTerm$]).pipe(
    map(([products, searchTerm]) => products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))),
  );
  products = signal<Product[]>([]);

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/store/product/?ordering=-created_at`).pipe(
      tap(products => {
        this.products$.next((products as any).results)
        this.products.set((products as any).results);
      })
    ).pipe(catchError(err => {
      console.error('Error fetching products:', err);
      return of([]);
    }));
  }

  getById(uuid: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/store/product/${uuid}/detail/`);
  }

  removeById(uuid: string): Observable<void> {
    const newProducts = this.products().filter(product => product.uuid!== uuid);
    this.products.set(newProducts);
    return this.http.delete<void>(`${this.apiUrl}/store/product/${uuid}/`);
  }

  updateById(uuid: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/store/product/${uuid}/`, updatedProduct);
  }

  add(newProduct: Product): Observable<Product> {
   return this.http.post<Product>(`${this.apiUrl}/store/product/`, newProduct);
  }
}
