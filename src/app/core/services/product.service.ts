import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    );
  }

  getById(uuid: string): Promise<any> {
    // Mock data
    return Promise.resolve({
      category: ['Electronics', 'Computers'],
      created_at: '2022-01-01',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image_url: 'https://placeholder.com/200x200',
      name: 'Product 1',
      price: '19.99',
      status: 'active',
      stock_quantity: 100,
      updated_at: '2022-01-01',
      uuid: '1234567890',
    });
  }

  removeById(uuid: string): Promise<void> {
    // Mock data
    return Promise.resolve();
  }

  updateById(uuid: string, updatedProduct: any): Promise<void> {
    // Mock data
    return Promise.resolve();
  }

  add(newProduct: any): Promise<void> {
    // Mock data
    return Promise.resolve();
  }
}
