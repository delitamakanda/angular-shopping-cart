import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {provideRouter} from "@angular/router";
import {routes} from "../../../app.routes";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {API_URL} from "../../../constants";
import {CartService} from "../../services/cart.service";
import {of} from "rxjs";

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),  // Mock HttpClient for testing purposes
        { provide: API_URL, useValue: 'https://example.com/api' },
        {
          provide: CartService, useClass: CartServiceMock  // Mock CartService for testing purposes
        },
      ]
    })
    .compileComponents();
    cartService = TestBed.inject(CartService);
    spyOn(cartService, 'getCartFromLocalStorage').and.callThrough();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty array for cart items', () => {
    expect(component.cartItems).toEqual([]);
  })

  it('should return total cart price', () => {
    expect(component.totalCartPrice).toBe(0);
  })

  it('should call getCartFromLocalStorage when created', () => {
    expect(cartService.getCartFromLocalStorage).toHaveBeenCalled();
  })
});

export class CartServiceMock {
  cartItemsWithQuantity() {
    return []
  }
  getCartItems() {
    return of([]);
  }

  cartItemsTotalPrice() {
    return 0;
  }

  getCartFromLocalStorage() {
    return of([]);
  }
}
