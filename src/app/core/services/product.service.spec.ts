import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { API_URL } from 'src/app/constants';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
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
    const mockProducts = {
      results: {
        results: {
          results: [
            { uuid: '1', name: 'Product 1', price: 100, category: ['Electronics'] },
            { uuid: '2', name: 'Product 2', price: 200, category: ['Computers'] },
            { uuid: '3', name: 'Product 3', price: 300, category: ['Clothing']  },
          ]
        }
      }
    } as any;

    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/store/product/?ordering=-created_at`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockProducts.results });
  });
});
