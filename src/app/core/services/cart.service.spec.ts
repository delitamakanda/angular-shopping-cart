import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    const product = {
      uuid: '123',
      name: 'Test Product',
      price: 10,
      status: 'IN_STOCK',
      image_url: 'test.jpg',
      category: ['Electronics'],
      description: 'Test Description',
      created_at: '2022-01-01',
      updated_at: '2022-01-01',
      stock_quantity: 10,
    };
    service.addToCart(product);
    expect(service.cartMap.get('123')).toBeTruthy();
  })
});
