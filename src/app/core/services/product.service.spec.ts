import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { API_URL } from 'src/app/constants';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {inject, signal} from "@angular/core";

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductService, useClass: ProductServiceMock  },
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://example.com/api' }  // Replace with actual API URL in your app
      ],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = TestBed.inject(API_URL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {

    const mockProducts2 = { results: [
      { uuid: '1', name: 'Product 1', price: 100, category: [ 'Electronics' ] },
        { uuid: '2', name: 'Product 2', price: 200, category: [ 'Computers' ] },
        { uuid: '3', name: 'Product 3', price: 300, category: [ 'Clothing' ] },
      ]
    };

    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts2.results as any);
    });
    const params = { limit: service.limit(), q: service.searchValue(), offset: service.offset(), ordering: '-created_at' };
    const req = httpMock.expectOne(`${apiUrl}/store/product/?limit=${params.limit}&q=${params.q}&offset=${params.offset}&ordering=-created_at`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts2.results);
  });
});

export class ProductServiceMock {
  products = signal<any[]>([
    { uuid: '1', name: 'Product 1', price: 100, category: ['Electronics'], image_url: 'image1.jpg' },
    { uuid: '2', name: 'Product 2', price: 200, category: ['Computers'], image_url: 'image2.jpg' },
    { uuid: '3', name: 'Product 3', price: 300, category: ['Clothing'], image_url: 'image3.jpg' },
  ]);
  apiUrl = 'https://example.com/api';
  http = TestBed.inject(HttpClient);

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/store/product/?limit=${this.limit()}&q=${this.searchValue()}&offset=${this.offset()}&ordering=-created_at`);

  }
  limit(): number {
    return 25;
  }

  searchValue(): string {
    return '';
  }

  offset(): number {
    return 0;
  }

  hasPreviousPage(): Observable<boolean> {
    return of(false);
  }

  hasMorePage(): Observable<boolean> {
    return of(true);
  }
}
