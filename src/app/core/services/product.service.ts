import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  getAll(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/store/product/?ordering=-created_at`).pipe(
      map(({results}) => results)
    ).pipe(catchError(err => {
      console.error('Error fetching products:', err);
      return of([]);
    }));
  }

  getById(uuid: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/store/product/${uuid}/detail/`);
  }

  removeById(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/store/product/${uuid}/`);
  }

  updateById(uuid: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/store/product/${uuid}/`, updatedProduct);
  }

  add(newProduct: Product): Observable<Product> {
   return this.http.post<Product>(`${this.apiUrl}/store/product/`, newProduct);
  }
}
