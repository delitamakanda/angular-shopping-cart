import { HttpClient } from '@angular/common/http';
import {inject, Injectable, signal, computed} from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, map, Observable, of, tap} from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Product } from '../interfaces/product.interface';
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private toastService = inject(ToastService);

  private products$ = new BehaviorSubject<Product[]>([]);
  private searchTerm$ = new BehaviorSubject<string>('');
  public productsSearched$ = combineLatest([this.products$, this.searchTerm$]).pipe(
    map(([products, searchTerm]) => products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))),
  );
  products = signal<Product[]>([]);
  searchProducts = signal<string>('');
  productsSearched = computed<Product[]>(() => {
    const str = this.searchValue();
    return str === '' ? this.products() : this.products().filter((product: any) => product.name.toLowerCase().includes(str));
  });
  limit = signal<number>(10);
  offset = signal<number>(0);
  searchValue = signal<string>('');
  hasMorePage = signal<boolean>(false);
  hasPreviousPage = signal<boolean>(false);

  setPageNext(): void {
    this.offset.set(this.offset() + this.limit());
  }

  setPagePrevious(): void {
    this.offset.set(this.offset() - this.limit());
  }

  setSearchValue(searchValue: string): void {
    this.searchValue.set(searchValue);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }


  getAll(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/store/product/?limit=${this.limit()}&q=${this.searchValue()}&offset=${this.offset()}&ordering=-created_at`).pipe(
      tap(({results, next, previous}) => {
        this.products$.next(results);
        this.products.set(results);
        this.hasMorePage.set(next!== null);
        this.hasPreviousPage.set(previous!== null);
      })
    ).pipe(catchError(err => {
      this.toastService.error(`Error fetching products: ${err.message}`);
      return of([]);
    }));
  }

  getById(uuid: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/store/product/${uuid}/detail/`);
  }

  removeById(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/store/product/${uuid}/`).pipe(
      tap(() => {
        this.products.update((current) => {
          const index = current.findIndex(product => product.uuid === uuid);
          if (index > -1) {
            current.splice(index, 1);
          }
          return current;
        });
        this.toastService.success('Product deleted successfully');
      }),
      catchError(err => {
        this.toastService.error(`Error deleting product: ${err.message}`);
        throw new Error('Failed to delete product');
      })
    );
  }

  updateById(uuid: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/store/product/${uuid}/`, updatedProduct);
  }

  add(newProduct: Product): Observable<Product> {
   return this.http.post<Product>(`${this.apiUrl}/store/product/`, newProduct);
  }
}
