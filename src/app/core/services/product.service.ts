import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal, computed} from '@angular/core';
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
  searchProducts = signal<string>('');
  productsSearched = computed<Product[]>(() => {
    const str = this.searchProducts();
    return str === '' ? this.products() : this.products().filter((product: any) => product.name.toLowerCase().includes(str));
  });

  setSearchValue(searchValue: string): void {
    this.searchProducts.set(searchValue);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }


  getAll(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/store/product/?ordering=-created_at`).pipe(
      map(products => products.results),
      tap(p => {
        this.products$.next(p);
        this.products.set(p);
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
    this.products.update((current) => {
      const index = current.findIndex(product => product.uuid === uuid);
      if (index > -1) {
        current.splice(index, 1);
      }
      return current;
    })
    return this.http.delete<void>(`${this.apiUrl}/store/product/${uuid}/`);
  }

  updateById(uuid: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/store/product/${uuid}/`, updatedProduct);
  }

  add(newProduct: Product): Observable<Product> {
   return this.http.post<Product>(`${this.apiUrl}/store/product/`, newProduct);
  }
}
