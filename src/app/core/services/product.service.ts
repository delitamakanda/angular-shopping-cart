import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { API_URL } from 'src/app/constants';
import { Product, Category } from '../interfaces';

interface ProductResponse {
  results: Product[];
  next: string | null;
  previous: string | null;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  getAll(params: {
    limit: number;
    q: string;
    offset: number;
    ordering: string;
    category_name_in: string;
    min_price: string;
    max_price: string;
  }): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/store/product/?limit=${params.limit}&q=${params.q}&offset=${params.offset}&ordering=${params.ordering}&category_name_in=${params.category_name_in}&min_price=${params.min_price}&max_price=${params.max_price}`);
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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/store/category-list/`);
  }
}
