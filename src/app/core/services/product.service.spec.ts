import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { API_URL } from 'src/app/constants';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import {Observable, of} from "rxjs";
import { signal} from "@angular/core";
import {Category} from "../interfaces";
import { ProductStoreService } from '../state/product.store.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let apiUrl: string;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      setCategory: jasmine.createSpy('setCategory'),
      setSearchValue: jasmine.createSpy('setSearchValue'),
      setOrdering: jasmine.createSpy('setOrdering'),
      setOffset: jasmine.createSpy('setOffset'),
      setTotalCount: jasmine.createSpy('setTotalCount'),
      setLimit: jasmine.createSpy('setLimit'),
      goToPage: jasmine.createSpy('goToPage'),
      products: signal<any[]>([]),
      category: signal<string>(''),
      searchValue: signal<string>(''),
      ordering: signal<string>('-created_at'),
      offset: signal<number>(0),
      totalCount: signal<number>(0),
      limit: signal<number>(25),
      hasMorePage: signal<boolean>(false),
      hasPreviousPage: signal<boolean>(false),
      loading: signal<boolean>(false),
      error: signal<string>(''),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductStoreService, useValue: mockStore  },
        {
          provide: ProductService, useClass: ProductServiceMock
        },
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

    const params = { limit: mockStore.limit(), q: mockStore.searchValue(), offset: mockStore.offset(), ordering: mockStore.ordering() } as any;
    service.getAll(params).subscribe((products) => {
      expect(products).toEqual(mockProducts2.results as any);
    });
    const req = httpMock.expectOne(`${apiUrl}/store/product/?limit=${params.limit}&q=${params.q}&offset=${params.offset}&ordering=${params.ordering}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts2.results);
  });

  it('should get categories', () => {
    const mockCategories = [
      { uuid: '1', name: 'Electronics' },
      { uuid: '2', name: 'Computers' },
      { uuid: '3', name: 'Clothing' },
    ];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories as any);
    });

    const req = httpMock.expectOne(`${apiUrl}/store/category-list/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  })
});

export class ProductServiceMock {
  products = signal<any[]>([
    { uuid: '1', name: 'Product 1', price: 100, category: ['Electronics'], image_url: 'image1.jpg' },
    { uuid: '2', name: 'Product 2', price: 200, category: ['Computers'], image_url: 'image2.jpg' },
    { uuid: '3', name: 'Product 3', price: 300, category: ['Clothing'], image_url: 'image3.jpg' },
  ]);
  apiUrl = 'https://example.com/api';
  http = TestBed.inject(HttpClient);

  getAll(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/store/product/?limit=${params.limit}&q=${params.q}&offset=${params.offset}&ordering=${params.ordering}`);

  }
  totalCount(): number {
    return this.products.length;
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

  ordering(): string {
    return '-created_at';
  }

  hasPreviousPage(): Observable<boolean> {
    return of(false);
  }

  hasMorePage(): Observable<boolean> {
    return of(true);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/store/category-list/`);
  }
}
